import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import ChatPage from '@/components/views/ChatPage.vue'
import { nextTick } from 'vue'

// mock axios
vi.mock('axios', () => ({
  default: {
    post: vi.fn().mockResolvedValue({
      data: {
        message: `
1. Dracaena trifasciata
Characteristics: Easy to grow, air-purifying.
Care: Water every 2 weeks.
2. Monstera deliciosa
Characteristics: Tolerates shade, large leaves.
Care: Keep soil moist.
3. Cactus
Characteristics: Drought-tolerant, unique look.
Care: Water rarely.
4. Peace Lily
Characteristics: Loves humidity.
Care: Mist leaves.`
      }
    })
  }
}))

// mock window.open
const openSpy = vi.spyOn(window, 'open').mockImplementation(() => {})

describe('ChatPage', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(ChatPage, {
    global: {
        stubs: {
        'router-link': {
            template: '<a :href="to" class="carbon-nav-btn"><slot /></a>',
            props: ['to']
        }
        }
    }
    })
  })

  it('renders page title and subtitle', () => {
    expect(wrapper.find('h1').text()).toMatch(/Recommended plants/i)
    expect(wrapper.text()).toContain('Customize your personalized plant')
  })

  it('renders all three dropdowns and disables button by default', () => {
    const selects = wrapper.findAll('select')
    expect(selects.length).toBe(3)
    const btn = wrapper.find('button')
    expect(btn.element.disabled).toBe(true)
  })

  it('enables the Get advice button after all conditions are selected', async () => {
    const selects = wrapper.findAll('select')
    await selects[0].setValue('Full sun(8 hours per day)')
    await selects[1].setValue('Once per week')
    await selects[2].setValue('Peat soil')
    await nextTick()
    const btn = wrapper.find('button')
    expect(btn.element.disabled).toBe(false)
  })

  it('shows loading animation after clicking Get advice', async () => {
    const selects = wrapper.findAll('select')
    await selects[0].setValue('Full sun(8 hours per day)')
    await selects[1].setValue('Once per week')
    await selects[2].setValue('Peat soil')
    await nextTick()
    const btn = wrapper.find('button')
    
    const axios = await import('axios')
    axios.default.post.mockImplementationOnce(() =>
        new Promise(resolve => setTimeout(() => resolve({
        data: { message: '1. Dracaena trifasciata\nCharacteristics: ...\nCare: ...' }
        }), 30))
    )
    
    await btn.trigger('click')
    await nextTick()
    expect(wrapper.find('.loading-overlay').exists()).toBe(true)
    expect(wrapper.text()).toContain('It is coming')
    await flushPromises()
  })

  it('shows GPT advice cards after advice is loaded', async () => {
    // select all for form
    const selects = wrapper.findAll('select')
    await selects[0].setValue('Full sun(8 hours per day)')
    await selects[1].setValue('Once per week')
    await selects[2].setValue('Peat soil')
    await nextTick()
    const btn = wrapper.find('button')
    await btn.trigger('click')
    await flushPromises()
    // 4 GPT cards
    const cards = wrapper.findAll('.plant-advice-card')
    expect(cards.length).toBe(4)
    expect(cards[0].text().toLowerCase()).toContain('dracaena')
    expect(cards[1].text().toLowerCase()).toContain('monstera')
  })

  it('shows fun tip and carbon footprint button after GPT cards', async () => {
    const selects = wrapper.findAll('select')
    await selects[0].setValue('Full sun(8 hours per day)')
    await selects[1].setValue('Once per week')
    await selects[2].setValue('Peat soil')
    await nextTick()
    const btn = wrapper.find('button')
    await btn.trigger('click')
    await flushPromises()
    await nextTick()
    const funTip = wrapper.find('.fun-tips')
    expect(funTip.exists()).toBe(true)
    expect(funTip.text().toLowerCase()).toContain('carbon footprint')
    const carbonBtn = wrapper.find('.carbon-nav-btn')
    expect(carbonBtn.exists()).toBe(true)
    expect(carbonBtn.text().toLowerCase()).toContain('understanding my carbon footprint')
  })

  it('shows static plant cards if not queried yet', () => {
    const plantCards = wrapper.findAll('.plant-card')
    expect(plantCards.length).toBeGreaterThanOrEqual(3)
    expect(plantCards[0].text().toLowerCase()).toContain('dracaena')
    expect(plantCards[1].text().toLowerCase()).toContain('monstera')
  })

  it('clicking Learn More on a plant card opens wikipedia in new tab', async () => {
    const cardLinks = wrapper.findAll('.plant-card a')
    await cardLinks[0].trigger('click')
    expect(openSpy).toHaveBeenCalled()
  })
})