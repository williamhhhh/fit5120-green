window.scrollTo = () => {}

import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import InfoPage from '@/components/views/InfoPage.vue'
import { useRouter } from 'vue-router'

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn()
  })
}))

let wrapper

beforeEach(() => {
  wrapper = mount(InfoPage)
})

describe('Initial State', () => {
  it('renders the main info page title', () => {
    expect(wrapper.find('.info-hero-title').text()).toMatch(/reimagine melbourne/i)
  })

  it('renders the fixed bottom CTA button', () => {
    const btn = wrapper.find('.discover-btn')
    expect(btn.exists()).toBe(true)
    expect(btn.text().toLowerCase()).toContain('discover')
  })
})

describe('Tab Navigation', () => {
  it('switches to second tab and shows UHI text', async () => {
    const tabs = wrapper.findAll('.info-tab')
    expect(tabs.length).toBe(3)
    await tabs[1].trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toMatch(/urban heat island/i)
    expect(wrapper.find('.info-section-title').text().toLowerCase()).toContain('urban heat')
  })

  it('switches to third tab and shows sustainability text', async () => {
    const tabs = wrapper.findAll('.info-tab')
    await tabs[2].trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toMatch(/sustainab/i)
    expect(wrapper.find('.info-section-title').text().toLowerCase()).toContain('sustain')
  })
})

describe('Content Areas', () => {
  it('shows list of urban greening benefits on third tab', async () => {
    const tabs = wrapper.findAll('.info-tab')
    await tabs[2].trigger('click')
    await wrapper.vm.$nextTick()
    const benefitList = wrapper.find('.info-list-green')
    expect(benefitList.exists()).toBe(true)
    expect(benefitList.findAll('li').length).toBeGreaterThanOrEqual(5)
  })

  it('shows UHI chart image on second tab', async () => {
    const tabs = wrapper.findAll('.info-tab')
    await tabs[1].trigger('click')
    await wrapper.vm.$nextTick()
    const img = wrapper.find('img[alt="UHI Bar Chart"]')
    expect(img.exists()).toBe(true)
  })

  it('shows energy chart image on third tab', async () => {
    const tabs = wrapper.findAll('.info-tab')
    await tabs[2].trigger('click')
    await wrapper.vm.$nextTick()
    const img = wrapper.find('img[alt="Energy Line Chart"]')
    expect(img.exists()).toBe(true)
  })
})

describe('Call to Action Button', () => {
  it('navigates to /GreenMap when clicking the CTA button', async () => {
    const btn = wrapper.find('.discover-btn')
    await btn.trigger('click')
    expect(wrapper.vm.router.push).toHaveBeenCalledWith('/GreenMap')
  })
})

describe('Tips', () => {
  it('shows discover tip below the CTA button', () => {
    const tip = wrapper.find('.discover-tip')
    expect(tip.exists()).toBe(true)
    expect(tip.text().toLowerCase()).toContain('greener places are closer')
  })
})