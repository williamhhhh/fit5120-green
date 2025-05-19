import { mount, flushPromises } from '@vue/test-utils'
import HomePage from '@/components/views/HomePage.vue'
import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock Chart.js + chart utilities
vi.mock('chart.js/auto', () => ({
  Chart: vi.fn().mockImplementation(() => ({
    destroy: vi.fn(),
    update: vi.fn(),
  })),
}))

vi.mock('@/components/utils/tempChart', () => ({
  fetchMinData: vi.fn(() => Promise.resolve([])),
  fetchMaxData: vi.fn(() => Promise.resolve([])),
  transformToChartJsFormat: vi.fn(() => ({
    data: { labels: [], datasets: [] },
    options: { scales: { y: {} }, plugins: { title: { text: '' } } },
    title: 'Chart Title'
  }))
}))

vi.mock('@/components/utils/greenGasChart', () => ({
  renderGreenGasChart: vi.fn(() => Promise.resolve({
    destroy: vi.fn()
  }))
}))

let wrapper

beforeEach(async () => {
  wrapper = mount(HomePage, {
    attachTo: document.body // For scrollIntoView testing
  })
  await flushPromises()
})

describe('HomePage.vue', () => {
    it('renders temperature chart by default', () => {
      expect(wrapper.vm.isTemp).toBe(true)
      expect(wrapper.find('#tempChart').exists()).toBe(true)
    })
  
    it('toggles to greenhouse chart on arrow click', async () => {
      const rightArrow = wrapper.findAll('.arrow').at(0)
      await rightArrow.trigger('click')
      expect(wrapper.vm.isTemp).toBe(false)
      expect(wrapper.find('#greenChart').exists()).toBe(true)
    })
  
    it('scrolls to graph section when button is clicked', async () => {
      const scrollSpy = vi.fn()
      window.HTMLElement.prototype.scrollIntoView = scrollSpy
  
      const button = wrapper.find('.button-get-started')
      await button.trigger('click')
  
      expect(scrollSpy).toHaveBeenCalled()
    })
  
    it('renders transition title text correctly', () => {
      const title = wrapper.find('.title')
      expect(title.text()).toMatch(/Melbourne is Getting Hotter/i)
    })
  })