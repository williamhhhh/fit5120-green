// carbonCalculator.spec.js
import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import CarbonCalculator from '@/components/views/GreenCalculator.vue'

let wrapper

beforeEach(() => {
  wrapper = mount(CarbonCalculator)
})

describe('Step Navigation', () => {
  it('starts at step 1', () => {
    expect(wrapper.vm.currentStep).toBe(1)
  })

  it('advances to step 2 if step 1 is valid', async () => {
    wrapper.vm.formDataOne.electric = '100'
    wrapper.vm.formDataOne.gas = '50'
    wrapper.vm.formDataOne.oil = '60'
    wrapper.vm.sumitFormOne()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.currentStep).toBe(2)
  })

  it('does not advance to step 2 if validation fails', async () => {
    wrapper.vm.formDataOne.electric = '' // invalid
    wrapper.vm.sumitFormOne()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.currentStep).toBe(1)
  })
})

describe('Validation Logic', () => {
  it('validates form 1 inputs', () => {
    wrapper.vm.formDataOne.electric = '-50'
    const valid = wrapper.vm.validateFormOne()
    expect(valid).toBe(false)
    expect(wrapper.vm.errors.electric).toBeDefined()
  })

  it('validates form 2 inputs', () => {
    wrapper.vm.formDataTwo.mileage = 'notANumber'
    const valid = wrapper.vm.validateFormTwo()
    expect(valid).toBe(false)
    expect(wrapper.vm.errorsTwo.mileage).toBeDefined()
  })

  it('validates form 3 boolean inputs', () => {
    wrapper.vm.formDataThree.recycleNewspaper = null
    const valid = wrapper.vm.validateFormThree()
    expect(valid).toBe(false)
    expect(wrapper.vm.errorsThree.recycleNewspaper).toBeDefined()
  })
})

describe('Carbon Calculation', () => {
  it('calculates carbon footprint correctly', () => {
    wrapper.vm.finalFormData = {
      electric: '100',
      gas: '50',
      oil: '30',
      mileage: '10000',
      flight: '2',
      flights: '1',
      recycleNewspaper: true,
      recycleAluminum: false
    }
    const result = wrapper.vm.calculateCarbonFootprint()
    expect(result).toBeGreaterThan(0)
    expect(typeof result).toBe('number')
  })

  it('selects the highest emission category correctly', () => {
    wrapper.vm.formDataOne = { electric: '100', gas: '10', oil: '0' }
    wrapper.vm.formDataTwo = { mileage: '0', flight: '0', flights: '0' }
    const [key, value] = wrapper.vm.selectHighestPercentage()
    expect(key).toBe('electric')
    expect(value).toBeGreaterThan(50)
  })
})

describe('Personalized Advice', () => {
  it('displays correct label for mileage as "driving"', () => {
    wrapper.vm.highest = 'mileage'
    expect(wrapper.vm.displayLabel).toBe('driving')
  })

  it('displays fallback label if unknown key', () => {
    wrapper.vm.highest = 'unknown'
    expect(wrapper.vm.displayLabel).toBe('unknown')
  })
})
