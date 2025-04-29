<template>
    <div class="container">
    <!-- First Row -->
        <div v-if="currentStep != 4" class="row justify-content-center mb-4 top-custom" style="padding-top: 120px;">
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
                            <img src="https://i.imgur.com/WrlS3nn.png" alt="intro" class="intro-image" />
                        </div>
                    </div>
                    
                    <form class="form-container" @submit.prevent="sumitFormOne">
                        <label for="electric" class="label-text">How much is your monthly electric bill?</label>
                        <input type="text" id="electric" name="electric" placeholder="$0.00" v-model="formDataOne.electric" />
                        <div v-if="errors.electric" class="text-danger"> {{ errors.electric }} </div>
                        <label for="gas" class="label-text">How much is your monthly gas bill?</label>
                        <input type="text" id="gas" name="gas" placeholder="$0.00" v-model="formDataOne.gas" />
                        <div v-if="errors.gas" class="text-danger"> {{ errors.gas }} </div>
                        <label for="oil" class="label-text">How much is your monthly petrol bill?</label>
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
                            <img src="https://i.imgur.com/WrlS3nn.png" alt="intro" class="intro-image" />
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
                            <img src="https://i.imgur.com/aQwVZnw.png" alt="intro" class="intro-image" />
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
                            <img src="https://media-hosting.imagekit.io/ec66124c433b4ad6/screenshot_1745827794110.png?Expires=1840435796&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=x3jq5W0AxBvH2hJhaqZnzcWjLXRrafHprP7g8bLu2~GquLCRbAjCctitQtn1ZJgaSohd12mtaEWK3gAzHxFq06CGhASxpUsV-7nUnG5IBojWo4raJHeefcECcq9Sb1aq1qc34hi-rodYeELxsJ6rEVqMR5kSLeGafxEONUt1NOXL-KSfnVyGIyyfdFBdVTh~-SUnUFLgKFEtNsV~vZfvrJFyYKofk-IED5nuHxbke5jBwHwkKzJ4OO4UEGvhlNU1SXWtHjhYggfo7NSgUgZy6boaA0obReIVPQEvGCzAyLn8Yh-scFO7a5AKUSpBKyMne9qAQ4ujuqZl1dMPXd9HWA__" alt="intro" class="intro-image" />
                        </div>
                    </div>

                    <div class="result-container">
                        <div class="result-text-container">
                            <div class="result-intro">Your Estimated Annual Carbon Footprint Per Year is:</div>
                            <div class="result-result">{{ calculateCarbonFootprint() }} tonnes</div>
                            <div class="result-result-desc">of carbon dioxide equivalent (tCO2e.)</div>
                        </div>

                        <div class="result-cards">
                            <div class="result-cards-row">
                                <div class="result-card">
                                    <div class="result-card-icon-row">
                                        <img class="result-card-icon" src="https://media-hosting.imagekit.io/7f97d99b5a1f4d87/screenshot_1745830257442.png?Expires=1840438260&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=O7~KSAUw~HpiQueArkD7Wo8YIdqKUrWK11JdL-2JxTOToSyZde7KvffKrj6yO3n8-ICp~kBwtX9x5JpDk~pS2bnrOzLVdND2QxUmKPOilUxnArkueQeyDN266h1wZQKS1WIgsucHtW7xTrAZmHjgY7x1l2Q2NIolTPU1WsyQoOwu2USpaR7nMecEeygIYh5uj8Uo9p4N6g-PcepYzzJD~QdfTRZcucvTjvP4L7RjB7HYQAhXDNHE36gaUG3tOu2osR1El5crAS8Ug6-7crv30INpZRPUoue3TtSX9zbQHA38e3Q00jU3zaFub27OqbYXgeqapJnL8wXTjOInE3pOVw__" />
                                        <div class="result-card-data">{{ carbonConversion.trees }}</div>
                                    </div>
                                    <div class="result-card-desc">trees needed to absorb this CO₂</div>
                                </div>
                                <div class="result-card">
                                    <div class="result-card-icon-row">
                                        <img class="result-card-icon" src="https://media-hosting.imagekit.io/980222a1954b42dd/screenshot_1745847889913.png?Expires=1840455891&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=PkeA8oDRV5lGEg63Hy0W-a79Sdu5BWq8C5l0ujOL3nSYS2IQp6eFXwXXy9tZYRMOSX0wGLNVxIWp4DBl7YuoOoMXfqtP12EFtfGBuop5i7Aq~KMfvzBllSdL4fg5piNZ2tjLs4-YdFsYRL9VKiUq1q18TOzLPkz--Ko4A~3o7VyxXodEQLbO5A3HyBM4sbDtm3koKcXjnNajFunNQGAaag61uNtRbz7q8m7YQ59YS30fjIaal0woKKxq9aAipvW3zmrZMGoJRvhoZblwtjQcSRhGyKpnaHOjjS18gQXp2Vcy6Rzv0NQuP5Xs~adztwpfZfYrstGWHCKalaciX9g47A__" />
                                        <div class="result-card-data">{{ carbonConversion.flights }}</div>
                                    </div>
                                    <div class="result-card-desc">flights from Melbourne to Sydney</div>
                                </div>
                            </div>
                            <div class="result-cards-row">
                                <div class="result-card">
                                    <div class="result-card-icon-row">
                                        <img class="result-card-icon" src="https://media-hosting.imagekit.io/0ff4a1d77ad04f57/screenshot_1745847988750.png?Expires=1840455990&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=gawox801oAutoUggpYX1H4qQQznnpe9jD23ZAAcxknGRUCkXfO1k1eUTol2sIJV-uM6cMogmeb0dU33kEzSwHDz-Kcem5YBjeHFr8uXWBCqAcq7SHtxSQaSMwI9jogiFJNBX6NvaLOhHZxCHCZpFLp~15BHm5zNeu5JSMcrUWQCRFepyMIHvn8cRfJvDV4ditle8Y8KgpuiKg4gAcy2KarHtQiF0IYIu5UI2pSGS-PB8t2XuqSp1oO7lxDOyY2YROg8HJOOZB6w-Mskm6t1OpbMVzVsv0FDDCwW0rYjTNrGQwUYJorq4n2SL8hwY4RiAfMRXWXZ4cm2bdT0ptScJxw__"/>
                                        <div class="result-card-data">{{ carbonConversion.ballons }}</div>
                                    </div>
                                    <div class="result-card-desc">hot air balloons full of carbon</div>
                                </div>
                                <div class="result-card">
                                    <div class="result-card-icon-row">
                                        <img class="result-card-icon" src="https://media-hosting.imagekit.io/4493558231b5415c/screenshot_1745848014600.png?Expires=1840456016&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=p30Eg4uLm6gbHE4J2pZ7YA-g7qSZdXEycib0zSBsRAP50EIlZ6wa1GhgsWHONBUTj3AFEvYozQQ43gCQYSscfVjaaE9ZqtIa0yiYbABqCGbQowPeK1k6DqWGgilyG8C6JsdBbV9LQywP5QemC56n5XKh6hbldkvSfpvAOBHzvZTk~snHqAlwnIv2NIUmQY2v2~BFfJk2cQOaoh9V9IkbxlDCOCQt5383T2Cu9yJfBVirPNht428PLoVEQTRKHR-zjLlln49dZnokxxBQRzuslYn854~Z9oLnfOszIAy66npKp-VGAwF~DLHzARB-JwDyrBKgx4ZjxQCgY8Mpy-tVbw__"/>
                                        <div class="result-card-data">{{ carbonConversion.kmDriven }}</div>
                                    </div>
                                    <div class="result-card-desc">km driven in a petrol car</div>
                                </div>
                            </div>

                            <div class="result-infor-row">

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
                        <button
                            type="button"
                            class="btn"
                            style="margin-top: 20px; width: 60%; height: 50px; background-color: #75BE3A; border-radius: 8px; border: none; justify-content: center;"
                            @click="clearForm"
                        >
                            Raise Your Awareness
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
        clearForm();
    } else {
        console.log('Form Three validation failed');
    }
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

const convertCO2 = async () => {
    const cb = await calculateCarbonFootprint()

    carbonConversion.value.trees = Math.round(cb * 46);
    carbonConversion.value.flights = Math.round(cb / 0.15);
    carbonConversion.value.ballons = Math.round(cb / 0.0035);
    carbonConversion.value.kmDriven = Math.round(cb / 0.0002);
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
    font-family: 'Domaine Display Narrow';
    font-style: normal;
    font-weight: 600;
    font-size: 80px;
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
    font-family: 'Domaine Display Narrow';
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
    font-family: 'Domaine Display Narrow';
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

/* 
<div class="result-cards">
                            <div class="result-card-row">
                                <div class="result-card">
                                    <div class="result-card-icon-row">
                                        <div class="result-card-icon"></div>
                                        <div class="result-card-data"></div>
                                    </div>
                                    <div class="result-card-desc"></div>
                                </div>
                                <div class="result-card">
                                    <div class="result-card-icon-row">
                                        <div class="result-card-icon"></div>
                                        <div class="result-card-data"></div>
                                    </div>
                                    <div class="result-card-desc"></div>
                                </div>
                            </div> */

</style>