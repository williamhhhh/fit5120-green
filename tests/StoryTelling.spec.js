// Mock canvas for jsdom
window.HTMLCanvasElement.prototype.getContext = () => {
    return {
      setTransform: () => {},
      clearRect: () => {},
      beginPath: () => {},
      arc: () => {},
      fill: () => {},
      fillStyle: '',
      globalAlpha: 1
    }
  }

import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import StoryTelling from '@/components/views/StoryTelling.vue'

let wrapper

beforeEach(() => {
  wrapper = mount(StoryTelling)
})

describe('Initial State', () => {
  it('shows the title when not started', () => {
    expect(wrapper.find('.title').exists()).toBe(true)
    expect(wrapper.text()).toContain('A Day in the Life of Daniel')
    expect(wrapper.vm.journeyStarted).toBe(false)
  })

  it('shows start button when not started', () => {
    const btn = wrapper.find('.start-button')
    expect(btn.exists()).toBe(true)
    expect(btn.text().toLowerCase()).toContain('start')
  })
})

describe('Journey Flow', () => {
  it('starts journey and hides title', async () => {
    const btn = wrapper.find('.start-button')
    await btn.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.journeyStarted).toBe(true)
    expect(wrapper.find('.title').exists()).toBe(false)
  })

  it('shows first story card after journey starts', async () => {
    wrapper.vm.startJourney()
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.story-card-center').exists()).toBe(true)
    expect(wrapper.find('.big-title').text()).toContain('Wake Up')
  })

  it('shows choice card when reaching a choice', async () => {
    wrapper.vm.startJourney()
    wrapper.vm.currentCard = 3 
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.choice-card').exists()).toBe(true)
    expect(wrapper.find('.question-title').text()).toBe('What should Daniel do?')
  })

  it('shows result panel after last story', async () => {
    wrapper.vm.journeyStarted = true
    wrapper.vm.currentStory = wrapper.vm.stories.length
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.final-result-panel').exists()).toBe(true)
    expect(wrapper.text()).toContain('Congratulations')
  })
})

describe('Back to Home Button', () => {
  it('shows "Back to Story" button on result page', async () => {
    wrapper.vm.journeyStarted = true
    wrapper.vm.currentStory = wrapper.vm.stories.length
    await wrapper.vm.$nextTick()
    const btn = wrapper.find('.back-home-btn')
    expect(btn.exists()).toBe(true)
    expect(btn.text().toLowerCase()).toContain('back')
  })

  it('clicking "Back to Story" resets the page', async () => {
    wrapper.vm.journeyStarted = true
    wrapper.vm.currentStory = wrapper.vm.stories.length
    await wrapper.vm.$nextTick()
    await wrapper.find('.back-home-btn').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.journeyStarted).toBe(false)
    expect(wrapper.find('.title').exists()).toBe(true)
  })
})

describe('Fireworks', () => {
  it('launchFireworks sets fireworkAnimationStarted to true', () => {
    wrapper.vm.journeyStarted = true
    wrapper.vm.currentStory = wrapper.vm.stories.length
    wrapper.vm.$nextTick(() => {
      wrapper.vm.launchFireworks()
      expect(wrapper.vm.fireworkAnimationStarted).toBe(true)
    })
  })

  it('stopFireworks sets fireworkAnimationStarted to false', () => {
    wrapper.vm.fireworkAnimationStarted = true
    wrapper.vm.stopFireworks()
    expect(wrapper.vm.fireworkAnimationStarted).toBe(false)
  })
})

describe('Result Calculation', () => {
  it('calculates correct result for all green choices', () => {
    wrapper.vm.choices = ['led', 'off', 'recycle', 'bike', 'compostable']
    const result = wrapper.vm.result
    expect(result.energy).toBe(4000)
    expect(result.temp).toContain('4')
    expect(result.co2).toBe(4)
    expect(result.weight).toBe(8)
  })

  it('calculates correct result for less green choices', () => {
    wrapper.vm.choices = ['halogen', 'on', 'leave', 'car', 'keep']
    const result = wrapper.vm.result
    expect(result.energy).toBe(1200)
    expect(result.temp).toContain('1')
    expect(result.co2).toBe(0.5)
    expect(result.weight).toBe(2)
  })
})