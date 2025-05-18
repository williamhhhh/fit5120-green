<template>
    <div class="container">
    <!-- First Row -->
        <div v-if="currentStep != 4" class="row justify-content-center mb-4 top-custom" style="padding-top: 40px;">
            <div class="col-12 col-md-10 col-lg-10 text-center">
                <h1 class="title">Calculate Your Carbon Footprint</h1>
            </div>
        </div>

        <div v-if="currentStep != 4" class="row justify-content-center mt-4">
            <div class="col-12 col-md-10 col-lg-10 slider">
                <div class="steps">
                    <div 
                        v-for="step in 4"
                        :key = "step"
                        class="step"
                        :class="{ active: currentStep >= step }"
                    >
                    <div class="one">{{ step }}</div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="currentStep == 1" class="row justify-content-center mb-4 top-custom" style="padding-top: 120px;">
            <div class="col-8 col-md-10 col-lg-10">
                <div class="selector-wrapper zoom-in">
                    <div id="selector" class="selector-container">
                        <div class="image-container">
                            <img src="@/assets/images/energy.png" alt="intro" class="intro-image" />
                        </div>
                    </div>
                    
                    <form class="form-container" @submit.prevent="sumitFormOne">
                        <label for="electric" class="label-text">How much is your monthly electric bill?</label>
                        <input type="text" id="electric" name="electric" placeholder="$0.00" v-model="formDataOne.electric" />
                        <div v-if="errors.electric" class="text-danger"> {{ errors.electric }} </div>
                        <label for="gas" class="label-text">How much is your monthly gas bill?</label>
                        <input type="text" id="gas" name="gas" placeholder="$0.00" v-model="formDataOne.gas" />
                        <div v-if="errors.gas" class="text-danger"> {{ errors.gas }} </div>
                        <label for="oil" class="label-text">How much is your monthly oil bill?</label>
                        <input type="text" id="oil" name="oil" placeholder="$0.00" v-model="formDataOne.oil"/>
                        <div v-if="errors.oil" class="text-danger"> {{ errors.oil }} </div>

                        <div class="button-container">

                            <button class="btn"  style="margin-top: 20px; width: 60%; height: 50px; background-color: #75BE3A; border-radius: 8px; border: none; justify-content: center;">
                                next
                            </button>

                        </div>

                    </form>

                </div> 
            </div>
        </div>

        <div v-if="currentStep == 2" class="row justify-content-center mb-4 top-custom" style="padding-top: 120px;">
            <div class="col-8 col-md-10 col-lg-10">
                <div class="selector-wrapper zoom-in">
                    <div id="selector" class="selector-container">
                        <div class="image-container">
                            <img src="@/assets/images/travel.png" alt="intro" class="intro-image" />
                        </div>
                    </div>
                    
                    <form class="form-container" @submit.prevent="sumitFormTwo">
                        <label for="mileage" class="label-text">What is your yearly mileage in total?</label>
                        <input type="text" id="mileage" name="mileage" placeholder="0.0km" v-model="formDataTwo.mileage"/>
                        <div v-if="errorsTwo.mileage" class="text-danger"> {{ errorsTwo.mileage }} </div>
                        <label for="flight" class="label-text">Number of flights(4 hours or less) you took in a year?</label>
                        <input type="text" id="flight" name="flight" placeholder="0" v-model="formDataTwo.flight"/>
                        <div v-if="errorsTwo.flight" class="text-danger"> {{ errorsTwo.flight }} </div>
                        <label for="flights" class="label-text">Number of flights(4 hours or more) you took in a year?</label>
                        <input type="text" id="flights" name="flights" placeholder="0" v-model="formDataTwo.flights"/>
                        <div v-if="errorsTwo.flights" class="text-danger"> {{ errorsTwo.flights }} </div>

                        <div class="button-container">
                            
                            <button
                            type="button"
                            class="btn"
                            style="margin-top: 20px; width: 40%; height: 50px; background-color: #75BE3A; border-radius: 8px; border: none; justify-content: center;"
                            @click="prevStep"
                            >
                            back
                            </button>

                            <button class="btn"  style="margin-top: 20px; width: 40%; height: 50px; background-color: #75BE3A; border-radius: 8px; border: none; justify-content: center;">
                                next
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>

        <div v-if="currentStep == 3" class="row justify-content-center mb-4 top-custom" style="padding-top: 120px;">
            <div class="col-8 col-md-10 col-lg-10">
                <div class="selector-wrapper zoom-in">
                    <div id="selector" class="selector-container">
                        <div class="image-container">
                            <img src="@/assets/images/waste.png" alt="intro" class="intro-image" />
                        </div>
                    </div>
                    
                    <form class="form-container" @submit.prevent="sumitFormThree">
                        <label class="label-text">Do you recycle newspaper?</label>
                        <div class="button-group">
                            <div class="bool-button" :class="{ active: formDataThree.recycleNewspaper === true}" @click="handleBoolYes" >
                                <div class="bool-text" >Yes</div>
                            </div>
                            <div class="bool-button" :class="{ active: formDataThree.recycleNewspaper === false}" @click="handleBoolNo">
                                <div class="bool-text">No</div>
                            </div>
                        </div>

                        <label class="label-text">Do you recycle aluminum or tin?</label>
                        <div class="button-group">
                            <div class="bool-button" :class="{ active: formDataThree.recycleAluminum === true}" @click="handleBoolYes2">
                                <div class="bool-text">Yes</div>
                            </div>
                            <div class="bool-button" :class="{ active: formDataThree.recycleAluminum === false}" @click="handleBoolNo2">
                                <div class="bool-text">No</div>
                            </div>
                        </div>
                        <div class="button-container">
                            
                            <button
                            type="button"
                            class="btn"
                            style="margin-top: 20px; width: 40%; height: 50px; background-color: #75BE3A; border-radius: 8px; border: none; justify-content: center;"
                            @click="prevStep"
                            >
                            back
                            </button>

                            <button class="btn"  style="margin-top: 20px; width: 40%; height: 50px; background-color: #75BE3A; border-radius: 8px; border: none; justify-content: center;">
                                next
                            </button>
                        </div>

                    </form>

                </div>
            </div>
        </div>

        <div v-if="currentStep == 4" class="row justify-content-center mb-4 top-custom" style="padding-top: 180px;">
            <div class="col-12 col-md-10 col-lg-10">
                <div class="selector-wrapper zoom-in">
                    <div id="selector" class="selector-container">
                        <div class="image-container">
                            <img src="@/assets/images/cal_earth.png" alt="intro" class="intro-image" />
                        </div>
                    </div>

                    <div class="result-container">
                        <div class="result-text-container" style="margin-bottom: 20px;">
                            <div class="result-intro">Your Estimated Annual Carbon Footprint Per Year is:</div>
                            <div class="result-result">{{ calculateCarbonFootprint() }} tonnes</div>
                            <div class="result-result-desc">of carbon dioxide equivalent (tCO2e.)</div>
                        </div>
<!-- 
                        <div class="slider-adjust-container" style="margin-top: 40px;">
                            <h3>Adjust your values to see how much CO₂ you can save:</h3>

                            <div class="mb-4" v-for="(label, key) in {
                                electric: 'Electric Bill ($/month)',
                                gas: 'Gas Bill ($/month)',
                                oil: 'Oil Bill ($/month)',
                                mileage: 'Yearly Mileage (km)',
                                flight: 'Short Flights (≤ 4hrs/year)',
                                flights: 'Long Flights (≥ 4hrs/year)'
                            }" :key="key">
                                <label :for="key">{{ label }}</label>
                                <input 
                                type="range" 
                                :id="key"
                                :min="0" 
                                :max="Number(finalFormData.value?.[key]) || 100" 
                                step="1" 
                                v-model.number="adjustedValues[key]"
                                style="width: 100%;"
                                />
                                <div>{{ adjustedValues[key] }}</div>
                            </div>

                            <div class="result-adjusted" style="margin-top: 20px;">
                                <div><strong>New Estimated Carbon Footprint:</strong> {{ adjustedFootprint }} tCO₂e</div>
                                <div><strong>CO₂ You Could Save:</strong> <span class="highlight">{{ carbonSaved }} tCO₂e</span></div>
                            </div>
                        </div> -->


                        <div class="result-cards">
                            <div class="result-cards-row">
                                <div class="result-card">
                                    <div class="result-card-icon-row">
                                        <img class="result-card-icon" src="@/assets/images/cal_tree.png" />
                                        <div class="result-card-data">{{ carbonConversion.trees }}</div>
                                    </div>
                                    <div class="result-card-desc">trees needed to absorb this CO₂ in a year</div>
                                </div>
                                <div class="result-card">
                                    <div class="result-card-icon-row">
                                        <img class="result-card-icon" src="@/assets/images/cal_plane.png" />
                                        <div class="result-card-data">{{ carbonConversion.flights }}</div>
                                    </div>
                                    <div class="result-card-desc">flights(CO₂ generated) from Melbourne to Sydney</div>
                                </div>
                            </div>
                            <div class="result-cards-row">
                                <div class="result-card">
                                    <div class="result-card-icon-row">
                                        <img class="result-card-icon" src="@/assets/images/cal_ballon.png"/>
                                        <div class="result-card-data">{{ carbonConversion.ballons }}</div>
                                    </div>
                                    <div class="result-card-desc">hot air balloons full of CO₂</div>
                                </div>
                                <div class="result-card">
                                    <div class="result-card-icon-row">
                                        <img class="result-card-icon" src="@/assets/images/cal_car.png"/>
                                        <div class="result-card-data">{{ carbonConversion.kmDriven }}</div>
                                    </div>
                                    <div class="result-card-desc">km driven in a petrol car(CO₂ generated)</div>
                                </div>
                            </div>
                        </div>

                        <div class="result-infor-container">
                            <div class="result-infor-text">
                                The average Australian household has an annual carbon footprint of approximately 
                                <span class="highlight">15–20 tCO₂e</span>.
                            </div>
                            <div class="result-infor-text">
                                According to the <span class="highlight">UN</span>, to limit global warming to 1.5 degrees by 2050 
                                we must limit our per-person emissions to 
                                <span class="highlight">2 tCO₂e per year</span>.
                            </div>
                            <div class="result-text-btn">
                                <div class="result-infor-text">
                                Now go through our <span class="highlight">user journey</span> to lower your carbon footprint (Click to activate!) ➡️
                                </div>
                                <button
                                type="button"
                                class="btn"
                                style="margin-top: 20px; width: 60%; height: 50px; background-color: #75BE3A; border-radius: 8px; border: none; justify-content: center;"
                                    @click="navigateToStory"
                                >
                                    Raise Your Awareness
                                </button>
                            </div>
                            <div class="personalized-container">
                                <div class="personalized-text-container">
                                    <div class="result-infor-text">
                                        <h4>Personalized Advice:</h4>
                                        <div class = "result-infor-text">
                                        Your <span class="highlight">highest carbon footprint</span> was in 
                                        <span class="highlight">{{ displayLabel }}</span>. It made up almost 
                                        <span class="highlight">{{ highestValue }}%</span> of your total carbon footprint.
                                        </div>
                                        <div class = "result-infor-text">
                                        <span class="highlight">Advice:</span> {{ carbonAdvice[highest] }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="button-box">
                        <button
                            type="button"
                            class="btn"
                            style="margin-top: 20px; width: 60%; height: 50px; background-color: #75BE3A; border-radius: 8px; border: none; justify-content: center;"
                            @click="reCalculate"
                        >
                            Calculate Again
                        </button>
                    </div>

                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { Tree } from 'primevue';
import { ref } from 'vue';
import { computed } from 'vue';


const highest = ref('');
const highestValue = ref(0);

const showResult = () => {

  const [key, value] = selectHighestPercentage();
  highest.value = key;
  highestValue.value = Math.round(value,2);
};

const displayLabel = computed(() => {
  switch (highest.value) {
    case 'mileage':
      return 'driving';
    default:
      return highest.value; // fallback to original key
  }
});


const carbonAdvice = ref({
  electric: 'Your electricity usage contributes significantly to your carbon footprint. Consider upgrading to energy-efficient appliances with ENERGY STAR ratings, switching to LED lighting throughout your home, and unplugging electronics when they’re not in use. If possible, install smart thermostats and power strips to automatically reduce phantom energy usage. You might also explore switching to a green electricity provider that uses solar or wind energy.',

  gas: 'High natural gas usage can mean excess emissions from heating and cooking. Try lowering your thermostat by just a few degrees in winter and dressing more warmly indoors. Seal gaps around windows and doors to retain heat. Installing programmable thermostats and insulating your water heater can also cut down gas consumption. If you cook with gas, use lids on pots and consider using energy-efficient cooking appliances like induction cooktops.',

  oil: 'Heating oil is one of the most carbon-intensive fuel sources. If your home uses oil heating, consider transitioning to a more sustainable option like electric heat pumps or solar heating. Until then, perform regular maintenance on your system, insulate pipes and your water tank, and reduce heating demand by improving insulation and using heavy curtains during colder months.',

  mileage: 'Frequent driving increases emissions, especially if using a gas-powered vehicle. Carpool with colleagues, use public transport when available, or explore biking and walking for shorter distances. Combine errands into one trip and drive efficiently—avoiding harsh acceleration and excessive idling. If feasible, consider switching to a hybrid or electric vehicle, and keep your tires inflated and your engine maintained to improve fuel efficiency.',

  flight: 'Air travel has a disproportionately high carbon impact. Try to minimize short-haul flights by choosing trains or buses where available. For longer trips, fly nonstop when possible and opt for airlines that invest in carbon offsetting programs. Reduce business travel by leveraging video conferencing tools. When you do fly, purchase carbon offsets from credible programs like Gold Standard or Climate Action Reserve.',

  flights: 'Frequent flying contributes heavily to your annual carbon output. Consider scheduling fewer but longer trips to reduce your flight frequency. For domestic or regional travel, explore trains or buses as lower-carbon alternatives. If travel is work-related, promote a remote-first policy with virtual meetings. Join airline programs that offer carbon offsetting, and support sustainable aviation initiatives when booking flights.'
});

const finalFormData = ref({
    electric: '',
    gas: '',
    oil: '',
    mileage: '',
    flight: '',
    flights: '',
    recycleNewspaper: false,
    recycleAluminum: false
});

const carbonConversion = ref({
    trees: 0,
    flights: 0,
    ballons: 0,
    kmDriven: 0
})

const formDataOne = ref({
    electric: '',
    gas: '',
    oil: ''
});

const formDataTwo = ref({
    mileage: '',
    flight: '',
    flights: ''
});

const formDataThree = ref({
    recycleNewspaper: false,
    recycleAluminum: false
});

const adjustedValues = ref({
  electric: 0,
  gas: 0,
  oil: 0,
  mileage: 0,
  flight: 0,
  flights: 0
});

adjustedValues.value = {
  electric: Number(finalFormData.value.electric || 0),
  gas: Number(finalFormData.value.gas || 0),
  oil: Number(finalFormData.value.oil || 0),
  mileage: Number(finalFormData.value.mileage || 0),
  flight: Number(finalFormData.value.flight || 0),
  flights: Number(finalFormData.value.flights || 0)
};



const adjustedFootprint = computed(() => {
  let total = 0;
  total += adjustedValues.value.electric * 105;
  total += adjustedValues.value.gas * 105;
  total += adjustedValues.value.oil * 113;
  total += adjustedValues.value.mileage * 0.79;
  total += adjustedValues.value.flight * 1100;
  total += adjustedValues.value.flights * 4000;
  total += finalFormData.value.recycleNewspaper ? 184 : 0;
  total += finalFormData.value.recycleAluminum ? 166 : 0;
  return Math.round(total * 100 * 0.000453592) / 100;
});

const carbonSaved = computed(() => {
  return Math.max(0, calculateCarbonFootprint() - adjustedFootprint.value);
});

const submittedCards = ref([]);

const clearForm = () => {
    formDataOne.value = {
        electric: '',
        gas: '',
        oil: ''
    };
    formDataTwo.value = {
        mileage: '',
        flight: '',
        flights: ''
    };
    formDataThree.value = {
        recycleNewspaper: false,
        recycleAluminum: false
    };
};

const sumitFormOne = () => {
    if (validateFormOne()) {
        console.log('Form One is valid, submitting...');
        finalFormData.value.electric = formDataOne.value.electric;
        finalFormData.value.gas = formDataOne.value.gas;
        finalFormData.value.oil = formDataOne.value.oil;
        nextStep();
        // Optionally move to next step here!
    } else {
        console.log('Form One validation failed');
    }
}

const sumitFormTwo = () => {
    if (validateFormTwo()) {
        console.log('Form Two is valid, submitting...');
        finalFormData.value.mileage = formDataTwo.value.mileage;
        finalFormData.value.flight = formDataTwo.value.flight;
        finalFormData.value.flights = formDataTwo.value.flights;
        nextStep();
    } else {
        console.log('Form Two validation failed');
    }
}
const sumitFormThree = () => {
    if (validateFormThree()) {
        console.log('Form Three is valid, submitting...');
        finalFormData.value.recycleNewspaper = formDataThree.value.recycleNewspaper;
        finalFormData.value.recycleAluminum = formDataThree.value.recycleAluminum;
        nextStep();
        convertCO2();
        showResult();
        clearForm();
    } else {
        console.log('Form Three validation failed');
    }
}

const navigateToStory = () => {
    clearForm();
    window.location.href = '/StoryTelling';
}

const reCalculate = () => {
    console.log('Recalculating...');
    currentStep.value = 1;
    clearForm();
}


const validateFormOne = () =>{
    let valid = true;

    // Validate Electric
    const electricNumber = Number(formDataOne.value.electric);
    if (!formDataOne.value.electric) {
        errors.value.electric = 'Electric bill is required';
        valid = false;
    } else if (isNaN(electricNumber)) {
        errors.value.electric = 'Electric bill must be a number';
        valid = false;
    } else if (electricNumber <= 0) {
        errors.value.electric = 'Electric bill must be greater than 0';
        valid = false;
    } else if (electricNumber > 10000) {
        errors.value.electric = 'Electric bill must not exceed $10,000';
        valid = false;
    }

    // Validate Gas
    const gasNumber = Number(formDataOne.value.gas);
    if (!formDataOne.value.gas) {
        errors.value.gas = 'Gas bill is required';
        valid = false;
    } else if (isNaN(gasNumber)) {
        errors.value.gas = 'Gas bill must be a number';
        valid = false;
    } else if (gasNumber < 0) {
        errors.value.gas = 'Gas bill cannot be negative';
        valid = false;
    }

    // Validate Oil
    const oilNumber = Number(formDataOne.value.oil);
    if (!formDataOne.value.oil) {
        errors.value.oil = 'Oil bill is required';
        valid = false;
    } else if (isNaN(oilNumber)) {
        errors.value.oil = 'Oil bill must be a number';
        valid = false;
    } else if (oilNumber < 0) {
        errors.value.oil = 'Oil bill cannot be negative';
        valid = false;
    }

    return valid;
}

const validateFormTwo = () => {
    errorsTwo.value = {
        mileage: '',
        flight: '',
        flights: ''
    };

    let valid = true;

    const mileageNumber = Number(formDataTwo.value.mileage);
    if (formDataTwo.value.mileage === '') {
        errorsTwo.value.mileage = 'Mileage is required';
        valid = false;
    } else if (isNaN(mileageNumber) || mileageNumber < 0) {
        errorsTwo.value.mileage = 'Mileage must be a valid non-negative number';
        valid = false;
    }

    const flightNumber = Number(formDataTwo.value.flight);
    if (formDataTwo.value.flight === '') {
        errorsTwo.value.flight = 'Short flights count is required';
        valid = false;
    } else if (isNaN(flightNumber) || flightNumber < 0) {
        errorsTwo.value.flight = 'Short flights must be a valid non-negative number';
        valid = false;
    }

    const flightsNumber = Number(formDataTwo.value.flights);
    if (formDataTwo.value.flights === '') {
        errorsTwo.value.flights = 'Long flights count is required';
        valid = false;
    } else if (isNaN(flightsNumber) || flightsNumber < 0) {
        errorsTwo.value.flights = 'Long flights must be a valid non-negative number';
        valid = false;
    }

    return valid;
};

const validateFormThree = () => {
    errorsThree.value = {
        recycleNewspaper: '',
        recycleAluminum: ''
    };

    let valid = true;

    if (formDataThree.value.recycleNewspaper === null) {
        errorsThree.value.recycleNewspaper = 'Recycling newspaper option is required';
        valid = false;
    }

    if (formDataThree.value.recycleAluminum === null) {
        errorsThree.value.recycleAluminum = 'Recycling aluminum option is required';
        valid = false;
    }

    return valid;
};

const calculateCarbonFootprint = () => {
    // Placeholder for the actual calculation logic
    console.log('Calculating carbon footprint with the following data:');
    console.log(finalFormData.value);
    let carbonFootprint = 0;
    carbonFootprint += Number(finalFormData.value.electric) * 105; 
    carbonFootprint += Number(finalFormData.value.gas) * 105;
    carbonFootprint += Number(finalFormData.value.oil) * 113;
    carbonFootprint += Number(finalFormData.value.mileage) * 0.79;
    carbonFootprint += Number(finalFormData.value.flight) * 1100;
    carbonFootprint += Number(finalFormData.value.flights) * 4000;
    carbonFootprint += finalFormData.value.recycleNewspaper ? +184 : +0;
    carbonFootprint += finalFormData.value.recycleAluminum ? +166 : +0;
    carbonFootprint = Math.round(carbonFootprint * 100 * 0.000453592) / 100; 
    console.log('Carbon Footprint:', carbonFootprint);

    return carbonFootprint;
};

const calculatePercentage = () => {
    const electric = Number(formDataOne.value.electric) * 105;
    const gas = Number(formDataOne.value.gas) * 105;
    const oil = Number(formDataOne.value.oil) * 113;
    const mileage = Number(formDataTwo.value.mileage) * 0.79;
    const flight = Number(formDataTwo.value.flight) * 1100;
    const flights = Number(formDataTwo.value.flights) * 4000;

    const total = electric + gas + oil + mileage + flight + flights;

    return {
        electric: (electric / total) * 100,
        gas: (gas / total) * 100,
        oil: (oil / total) * 100,
        mileage: (mileage / total) * 100,
        flight: (flight / total) * 100,
        flights: (flights / total) * 100
    };
}

const selectHighestPercentage = () => {
    const percentages = calculatePercentage();
    let highest = 0;
    let highestKey = '';

    for (const key in percentages) {
        if (percentages[key] > highest) {
            highest = percentages[key];
            highestKey = key;
        }
    }

    return [highestKey, highest];
}

const convertCO2 = async () => {
    const cb = await calculateCarbonFootprint()

    carbonConversion.value.trees = Math.round(cb * 38);
    carbonConversion.value.flights = Math.round(cb / 0.1);
    carbonConversion.value.ballons = Math.round(cb / 0.0039);
    carbonConversion.value.kmDriven = Math.round(cb / 0.065231 * 100);
}




const errors = ref({
    electric: null,
    gas: null,
    oil: null
});

const errorsTwo = ref({
    mileage: null,
    flight: null,
    flights: null
});

const errorsThree = ref({
    recycleNewspaper: null,
    recycleAluminum: null
});

const steps = ref([
    { id: 1, label: 'Step 1' },
    { id: 2, label: 'Step 2' },
    { id: 3, label: 'Step 3' },
    { id: 4, label: 'Step 4' }
]);
const currentStep = ref(1);

const nextStep = () => {
    if (currentStep.value < steps.value.length) {
        currentStep.value++;
        console.log(currentStep.value);
    }
};

const prevStep = () => {
    if (currentStep.value > 1) {
        currentStep.value--;
    }
};



const isActive = (step) => {
    return step.id === currentStep.value;
};

function handleBoolYes() {
    formDataThree.value.recycleNewspaper = true;
}
function handleBoolNo() {
    formDataThree.value.recycleNewspaper = false;
}
function handleBoolYes2() {
    formDataThree.value.recycleAluminum = true;
}
function handleBoolNo2() {
    formDataThree.value.recycleAluminum = false;
}

</script>

<style scoped>
.title{
    font-family: 'DM Serif Display', serif;
    font-style: normal;
    font-weight: 600;
    font-size: 50px;
}

.container{
    background: none;
}

.steps{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    padding: 0px;
    gap: 56px;
    width: 456px;
    height: 72px;
}

.step{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0px;
    gap: 8px;

    width: 72px;
    height: 72px;

    background: #f4f4f4;
    border-radius: 100px;
}

.step.active{
    background: #6bd767;
}

.one{
    width: 23px;
    height: 28px;

    font-family: 'DM Sans';
    font-style: normal;
    font-weight: 600;
    font-size: 22px;
    line-height: 28px;
    /* identical to box height, or 127% */
    text-align: center;
    letter-spacing: -0.02em;

    color: #0a0a0a;
}

.selector-wrapper {
    position: relative;
    width: 100%;
    /* height: 850px; */

    background-color: #E4FDE2;
    border-radius: 10px;
    border-width: 2px;
    box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.2);
    padding: 20px;
}

@keyframes zoomIn {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.zoom-in {
  animation: zoomIn 1s ease-in-out;
}

.intro-image {
    width: 900px;
    height: 300px;
    object-fit: contain;
    border-radius: 10px;
    animation: zoomIn 1s ease-in-out;
}

.image-container {
    width: 100%;
    overflow: hidden; 
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

.form-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 0px;
    padding-left: 40px;
    gap: 32px;
    flex-direction: column;
}

.label-text {
    font-family: 'DM Sans';
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 28px;
    /* identical to box height, or 127% */
    text-align: center;
    letter-spacing: -0.02em;
    color: #021706;
}

input[type="text"] {
    width: 100%;
    max-width: 600px; 
    padding: 10px 15px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    outline: none;
    transition: border-color 0.3s, box-shadow 0.3s;
}

input[type="text"]:focus {
    border-color: #56cf7b; /* blue color when focusing */
    box-shadow: 0 0 5px rgba(74, 226, 81, 0.5);
}

.button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px;
    flex-direction: row;
    gap: 20px;
    width: 100%;
}

.slider {
    display: flex;
    justify-content: center;
}

.form-container {
    width: 100%;
}

.button-group {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    gap: 8px;
}

.bool-button {
    box-sizing: border-box;

    /* Auto layout */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 24px;
    gap: 8px;

    width: 76px;
    height: 48px;

    background: #FFFFFF;
    border: 1px solid #90CF8E;
    border-radius: 68px;
}

.bool-button:hover {
    background: #90CF8E;
    color: #fff;
    transform: scale(1.03);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    cursor: pointer;
}

.bool-button.active {
    background: #90CF8E;
    color: #fff;
    font-weight: 600;
    box-shadow: inset 0 0 0 2px #5a9e2b;
}

.bool-text {
    /* Yes */

    width: 28px;
    height: 28px;

    font-family: 'DM Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    /* identical to box height, or 156% */
    display: flex;
    align-items: center;
    letter-spacing: -0.02em;

    color: #000000;

}

.result-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    flex-direction: column;
}

.result-text-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
}

.result-intro {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'DM Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 28px;
    /* identical to box height, or 117% */
    text-align: center;
    letter-spacing: -0.02em;
    margin-bottom: 30px;
    color: #000000;
}

.result-result {
    font-family: 'DM Serif Display', serif;
    font-style: normal;
    font-weight: 600;
    font-size: 88px;
    line-height: 88px;
    /* identical to box height */
    display: flex;
    align-items: center;
    text-align: center;
    margin-bottom: 25px;
    color: #064612;
}

.result-result-desc{
    font-family: 'DM Serif Display', serif;
    font-style: normal;
    font-weight: 300;
    font-size: 24px;
    line-height: 24px;
    /* identical to box height */
    display: flex;
    align-items: center;
    text-align: center;

    color: #064612;
}

.result-cards {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    width: 100%;
}

.result-cards-row {
    display: flex;
    align-items: flex-start;
    padding: 0px;
    gap: 16px;
    flex-direction: row;
    width: 90%;
}

.result-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    gap: 8px;

    width: 80%;
    height: 905;

    background: #FFFFFF;
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.08);
    border-radius: 16px;
}

.result-card-icon-row {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 8px;
}

.result-card-icon{
    width: 50px;
    height: 50px;
}

.result-card-data{
    font-family: 'DM Sans';
    font-style: normal;
    font-weight: 600;
    font-size: 40px;
    line-height: 52px;
    /* identical to box height */
    text-align: center;
    letter-spacing: -0.02em;

    color: #000000;
}

.result-card-desc{
    font-family: 'DM Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    /* identical to box height */
    text-align: center;
    letter-spacing: -0.02em;

    color: rgba(0, 0, 0, 0.7);  
}

.btn:hover {
    background: #90CF8E;
    color: #fff;
    transform: scale(1.03);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    cursor: pointer;
}

.button-box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    padding: 5% 4% 5% 4%;
    gap: 20px;
    width: 100%;
}

.result-infor-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    margin-top: 20px;
    gap: 20px;
    width: 80%;
    background-color: #FFFFFF;
    border-radius: 10px;
    border-width: 2px;
    box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.2);
    padding: 20px;
}

.result-infor-text {
    font-family: 'DM Sans', sans-serif;
    font-size: 20px;
    color: #064612; /* dark green for main text */
    line-height: 1.5;
    max-width: 800px;
}

.highlight {
    color: #75BE3A; /* bright green or whatever fits your brand */
    font-weight: 700;
}

.result-text-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 10px;
    width: 100%;
}

.personalized-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    background-color: #E4FDE2;
    border-radius: 10px;
    border-width: 2cap;
    border: 1px  #5bff79; 
    border-color: #021706;
    box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.2);
}

.personalized-text-container{
    margin: 20px;
}

/* .slider-adjust-container {
  background-color: #f5f5f5;
  border-radius: 12px;
  padding: 30px;
  margin-top: 40px;
}
.slider-adjust-container h3 {
  margin-bottom: 20px;
}
.slider-adjust-container label {
  font-weight: 600;
} */


</style>