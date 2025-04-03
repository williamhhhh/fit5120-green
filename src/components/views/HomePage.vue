<template>
    <div class="desc-container">
        <img src="https://i.imgur.com/jYx4z1b.jpeg" alt="green" class="green-city">
        <!-- <div class="title-container">
            <h1 class="title">Melbourne is Getting Hotter - Let's Cool It Down Together</h1>
            <p class="description">
                Join us in tackling urban heat and reducing CO2 emissions through small, everyday actions.
            </p>
            <button class="button-get-started">Get Started</button>
        </div> -->
        <div
        class="position-absolute top-50 p-4"
        style="max-width: 600px; background: none; border-radius: 10px; color: white;"
        >
        <h1 class="h3 h1-md fw-bold">
            Melbourne is Getting Hotter – Let's Cool It Down Together
        </h1>
        <p class="lead d-none d-sm-block">
            Join us in tackling urban heat and reducing CO₂ emissions through small, everyday actions.
        </p>
        <button class="btn btn-light mt-3">Get Started</button>
        </div>
    </div>
</template>

<script>

</script>

<style scoped>
.green-city {
    width: 100%;
    position: absolute;
    height: auto;
    margin-bottom: 20px;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), linear-gradient(290.75deg, rgba(164, 161, 71, 0.6) 11.38%, rgba(255, 255, 255, 0) 44.52%);
    transform: matrix(-1, 0, 0, 1, 0, 0);
    filter: brightness(50%);
}

.title-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 16px;

    position: absolute;
    width: 724px;
    height: 272px;
    left: 70px;
    top: 486px;
    color: white;
    z-index: 100;
}

.title{
    font-size: 40px;
    font-weight: bold;
    margin-bottom: 20px;
}

.button-get-started{
    width: 120px;
    height: 40px;
    background: #ffffff;
    position: relative;
    border-radius: 5px;
    border: none;
    color: rgb(0, 0, 0);
    font-size: 16px;
    cursor: pointer;
    z-index: 100;
}

.button-get-started:hover{
    background: #5a9e2b;
}

.button-get-started:active{
    background: #4a7e23;
}

</style>