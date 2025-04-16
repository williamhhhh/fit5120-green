<template> 
    <div class="desc-container">
        <img src="https://i.imgur.com/jYx4z1b.jpeg" alt="green" class="green-city">
        <div class="title-container">
            <h1 class="title">Melbourne is Getting Hotter - Let's Cool It Down Together</h1>
            <p class="description">
                Join us in tackling urban heat and reducing CO2 emissions through small, everyday actions.
            </p>
            <button @click="navigateTo('/GreenMap')" class="button-get-started">Get Started</button>
        </div>
        <!-- <div
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
        </div> -->
    </div>

    <!-- <div class="why-container">
        <div class="row">
            <div class="col-md-5">
                <div class="why-title">Why is Melbourne Heating up</div>
                <div class="why-desc">With an average of 11 days over 35°C each year – 
                    projected to rise to 16 days by 2050 – our city is experiencing more intense heatwaves. 
                    Two key factors are driving this crisis:</div>
                <div class="why-list">
                    <div class="icon-container">
                        <div class="icon-row">
                            <div class="icon-box">
                                <div class="icon-frame">
                                <div class="vector vector-leaf1"></div>
                                <div class="vector vector-leaf2"></div>
                                </div>
                            </div>

                            <div class="icon-desc">
                                <div class="icon-tittle"> Loss of Green Cover</div>
                                <div class="icon-content">More concrete, less greenery, and fewer shaded areas lead to higher urban temperatures.</div>
                            </div>
                        </div>

                        <div class="icon-row">
                            <div class="icon-box">
                                <div class="icon-frame2">
                                <div class="vector vector-bycycle1"></div>
                                <div class="vector vector-bycycle2"></div>
                                <div class="vector vector-bycycle3"></div>
                                <div class="vector vector-bycycle4"></div>
                                </div>
                            </div>

                            <div class="icon-desc">
                                <div class="icon-tittle">High CO2 Emissions</div>
                                <div class="icon-content">Petrol and diesel vehicle usage increases greenhouse gases and air pollution.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-7">
                <img src="https://i.imgur.com/oYvKyT9.png" alt="why" class="img-fluid">
            </div>
        </div>
    </div> -->

    <!-- <div class="solution-container">
        <div class="solution-tittle">Our Two-Part Solution</div>
            <div class="twosolution-container">
                    <div class="group1">
                        <div class="group1-content">
                            <div class="group1-text-button">

                                <div class="group1-text">
                                    <div class="g1-header">Expanding Green Spaces</div>
                                    <div class="g1-desc">Adding more plants in our homes, communities, and public spaces helps combat heatwaves and improve air quality.</div>
                                </div>


                                    <button @click="navigateTo('https://www.plt.org/educator-tips/urban-green-spaces/')" class="g1-link-text">Learn More</button>
                                
                            </div>
                        </div>
                        <div class="g1-image"></div>
                    </div>
                    
                    <div class="group2">
                        <div class="group2-content">
                            <div class="group2-text-button">
                                <div class="group2-text">
                                    <div class="g2-header"> Switching to E-Mobility</div>
                                    <div class="g2-desc">Reducing car emissions by shifting to E-bikes and cleaner transport can significantly cut down pollution.</div>
                                </div>

                                    <button @click="navigateTo('https://www.mckinsey.com/industries/automotive-and-assembly/our-insights/why-the-automotive-future-is-electric')" class="g2-link-text">Learn More</button>

                            </div>
                        </div>
                        <div class="g2-image"></div>
                    </div>
        </div>
    </div> -->

</template>

<script>
export default {
  methods: {
    navigateTo(link) {
      window.location.href = link; // 跳转到指定链接
    }
  }
};
</script>

<style scoped>

.main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 0px;
    gap: 0px;
    position: relative;
    width: 100%;
    height: 100vh;
    background-color: #ffffff00;
}

.desc-container {
    position: relative;
    width: 100%;
    height: 100%;
    /* display: flex; */
    /* align-items: center; */
    background: none;
}

@media (min-width: 768px) {
    .solution-container {
        /* Auto layout */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0px;
    gap: 32px;
    position: relative;
    width: 80%;
    margin: auto;
    max-width: 1000px;
    height: 653px;
    /* margin: 0 auto;  */
    /* top: 1694px; */

    /* Inside auto layout */
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
}
}

@media (max-width: 768px) {
    .solution-container {
        /* Auto layout */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0px;
    gap: 32px;
    position: relative;
    width: 80%;
    margin: auto;
    max-width: 768px;
    height: 653px;
    /* margin: 0 auto;  */
    /* top: 1694px; */

    /* Inside auto layout */
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
}
}

.solution-tittle {
    width: 100%;
    height: 66px;
    font-family: 'Domaine Display Narrow';
    font-style: italic;
    font-weight: 600;
    font-size: 48px;
    line-height: 66px;
    /* identical to box height, or 138% */
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;

    color: #000000;
    z-index: 1001;
    /* Inside auto layout */
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
}

.twosolution-container {
    /* Auto layout */
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 20px;
    width: 100%;
    max-width: 1280px;
    height: 555px;

    /* Inside auto layout */
    flex: none;
}

@media (max-width: 768px) {
.twosolution-container {
    /* Auto layout */
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px;
    gap: 20px;
    width: 100%;
    max-width: 1000px;
    height: 555px;

    /* Inside auto layout */
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
}
}

.group1 {
    /* Group 2 */
    width: 480px;
    height: 555px;
    /* Inside auto layout */
    flex: none;
    order: 0;
    left: 0;
    flex-grow: 1;
    z-index: 1000;
}

.g1-image {
    position: relative;
    width: 480px;
    height: 555px;
    left: 0px;
    top: 0px;
    background: url(https://i.imgur.com/sR7SEcM.png);
    background-size: contain; 
    background-repeat: no-repeat; 
}

.group1-content {
    box-sizing: border-box;
    /* Auto layout */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 16px;
    gap: 12px;

    position: absolute;
    width: 480px;
    height: 116px;
    left: 0px;
    bottom: 130px;
    z-index: 1001;
    background: rgba(255, 255, 255, 0.2);
    border-top: 1px solid #FFFFFF;
    backdrop-filter: blur(7px);
    /* Note: backdrop-filter has minimal browser support */
}

.group1-text-button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between; 
    padding: 0;
    gap: 12px;
    width: 100%; 
    height: auto;
}


.group1-text {

    /* Auto layout */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 12px;
    
    width: 300px;
    height: 84px;

    /* Inside auto layout */
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
}

.g1-header {
    width: 455px;
    height: 24px;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 24px;
    /* identical to box height, or 100% */

    color: #FFFFFF;


    /* Inside auto layout */
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
}

.g1-desc {
    width: 455px;
    height: 48px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    /* or 150% */

    color: #FFFFFF;

    /* Inside auto layout */
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
}

.g1-link{
    /* Auto layout */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 14px 22px;
    gap: 12px;
    width: 131px;
    height: 52px;
    background: #FFFFFF;
    border-radius: 48px;

    /* Inside auto layout */
    flex: none;
    order: 1;
    flex-grow: 0;
}


/* Group 2 */

.group2 {
    /* Group 2 */
    width: 480px;
    height: 555px;
    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 1;
    z-index: 999;
}

.g2-image {
    position: relative;
    width: 480px;
    height: 555px;
    left: 0px;
    top: 0px;
    /* background: linear-gradient(180deg, rgba(0, 0, 0, 0) 45.65%, rgba(0, 0, 0, 0.5) 74.27%), url(https://i.imgur.com/1UCTi6S.png); */
    background: url(https://i.imgur.com/1UCTi6S.png);
    background-size: contain; 
    background-repeat: no-repeat; 
}

.group2-content {

    box-sizing: border-box;
    /* Auto layout */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 16px;
    gap: 12px;

    position: absolute;
    width: 480px;
    height: 116px;
    left: 500px;
    bottom: 130px;

    background: rgba(255, 255, 255, 0.2);
    border-top: 1px solid #FFFFFF;
    backdrop-filter: blur(7px);
    z-index:1001;
    /* Note: backdrop-filter has minimal browser support */
}

.group2-text-button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between; 
    padding: 0;
    gap: 12px;
    width: 100%; 
    height: auto; 
}

.group2-text {
    /* Auto layout */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 12px;

    width: 455px;
    height: 84px;


    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 1;
}

.g2-header {
/* Switching to E-Mobility */

width: 455px;
height: 24px;

font-family: 'Inter';
font-style: normal;
font-weight: 600;
font-size: 24px;
line-height: 24px;
/* identical to box height, or 100% */

color: #FFFFFF;
/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
}

.g2-desc {
    /* Reducing car emissions by shifting to E-bikes and cleaner transport can significantly cut down pollution. */
    width: 300px;
    height: 48px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 24px;
    /* or 150% */

    color: #FFFFFF;
    /* Inside auto layout */
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
}

.g2-link{
    /* Auto layout */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 14px 22px;
    gap: 12px;
    width: 131px;
    height: 52px;
    
    background: #FFFFFF;
    border-radius: 48px;
    /* Inside auto layout */
    flex: none;
    order: 1;
    flex-grow: 0;
}

.g1-link-text,
.g2-link-text {
  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 14px 22px;
  gap: 12px;
  width: 131px;
  height: 52px;
  background: #ffffff;
  border-radius: 48px;

  position: relative;
  z-index: 1; 

  cursor: pointer; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); 
  transition: background-color 0.3s; 
}

.g1-link-text:hover,
.g2-link-text:hover {
  background: #f0f0f0;
}


.g1-link-text,
.g2-link-text {
  display: inline-flex;
  width: auto;
  text-align: center;
}

.icon-desc {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 12px;

    width: 50px;
    height: 80px;

    /* Inside auto layout */
    flex: none;
    order: 1;
    flex-grow: 0;
}

.icon-tittle {
    width: 197px;
    height: 20px;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    /* or 120% */

    color: #000000;

    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 0;
}

.icon-content {
    width: 350px;
    height: 48px;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    /* or 150% */

    color: #525252;

    /* Inside auto layout */
    flex: none;
    order: 1;
    flex-grow: 0;

}
.icon-frame {
    position: absolute;
    width: 24px;
    height: 24px;
    left: calc(50% - 24px / 2);
    top: calc(50% - 24px / 2);
    cursor: pointer;
    z-index: 999;
}

.icon-frame2 {
    position: absolute;
    width: 24px;
    height: 24px;
    left: 12px;
    top: 12px;
}

.vector-bycycle1 {
    position: absolute;
    left: 62.5%;
    right: 8.33%;
    top: 58.33%;
    bottom: 12.5%;

    border: 1.5px solid #000000;
}

.vector-bycycle2 {
    position: absolute;
    left: 8.33%;
    right: 62.5%;
    top: 58.33%;
    bottom: 12.5%;

    border: 1.5px solid #000000;
}

.vector-bycycle3 {
    position: absolute;
    left: 58.33%;
    right: 33.33%;
    top: 16.67%;
    bottom: 75%;

    border: 1.5px solid #000000;
}

.vector-bycycle4 {
    position: absolute;
    left: 37.5%;
    right: 29.17%;
    top: 33.33%;
    bottom: 27.08%;

    border: 1.5px solid #000000;
}

.vector-leaf1 {
    position: absolute;
    left: 16.58%;
    right: 12.5%;
    top: 8.33%;
    bottom: 16.67%;
    border: 1.5px solid #000000;
}

.vector-leaf2 {
    position: absolute;
    left: 8.33%;
    right: 45.83%;
    top: 50%;
    bottom: 12.5%;
    border: 1.5px solid #000000;
}

@media (min-width: 1281px){
    .desc-container {
    position: relative;
    width: 100%;
    min-height: 100vh;

    margin: auto;
    /* display: flex; */
    align-items: center;
    background: none;
}
}

.desc-container {
    position: relative;
    width: 100%;
    min-height: 100vh;
    max-width: 1580px;
    max-height: 680px;
    margin: auto;
    margin-bottom: 0px;
    /* display: flex; */
    align-items: center;
    background: none;
}


.green-city {
    width: 100%;
    position: absolute;
    height: 100%;
    background-size: contain;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), linear-gradient(290.75deg, rgba(164, 161, 71, 0.6) 11.38%, rgba(255, 255, 255, 0) 44.52%);
    transform: matrix(-1, 0, 0, 1, 0, 0);
    filter: brightness(50%);
}

@media (min-width: 1281px) {
    .green-city {
        width: 100%;
        position: absolute;
        height: auto;
        background-size: contain;
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), linear-gradient(290.75deg, rgba(164, 161, 71, 0.6) 11.38%, rgba(255, 255, 255, 0) 44.52%);
        transform: matrix(-1, 0, 0, 1, 0, 0);
        filter: brightness(50%);
    }
}

.why-image {
    width: 100%;
    max-width: 1280px;
    margin: auto;
    margin-bottom: 20px;
    position: relative;
}

@media (min-width: 768px) {
    .why-container {
    display: flex;

    flex-direction: row;
    align-items: center;
    margin: auto;
    margin-top: 60px;
    margin-bottom: 0px;
    /* top: 100px; */
    padding: 0px;
    max-width: 1000px;
    position: relative;
    width: 90%;

    height: 653px;
    background-color: white;
    /* top: 961px; */
}
}

@media (max-width: 768px) {
    .why-container {
    display:none!important;
}
}


.why-title {
    width: 516px;
    height: 132px;

    font-family: 'Domaine Display Narrow';
    font-style: italic;
    font-weight: 600;
    font-size: 48px;
    line-height: 66px;
    /* or 138% */
    display: flex;
    align-items: center;

    color: #000000;
}

.icon-container {
    /* Auto layout */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 16px;

    width: 526px;
    height: 176px;

    /* Inside auto layout */
    flex: none;
    order: 1;
    flex-grow: 0;
}

.icon-row {
    /* Auto layout */
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    gap: 12px;

    width: 488px;
    height: 80px;

    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 0;

}

.icon-box {
   /* Featured icon*/
    box-sizing: border-box;

    width: 48px;
    height: 48px;

    border: 1px solid #EAECF0;
    /* Shadows/shadow-xs */
    filter: drop-shadow(0px 1px 2px rgba(16, 24, 40, 0.05));
    border-radius: 10px;

    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 0;
}

.why-desc {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    /* or 150% */

    color: #525252;
}

.why-list {
    /* Auto layout */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 16px;
    width: 526px;
    height: 176px;
    /* Inside auto layout */
    flex: none;
    order: 1;
    flex-grow: 0;

}

@media (max-width: 768px) {
    .title-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 16px;

    position: absolute;
    width: 300px;
    height: 50px;
    left: 70px;
    top: 60px;
    color: white;
    z-index: 100;
}
}

@media (max-width: 768px) {
    .description {
        display: none;
    }
}

@media (min-width: 769px) {
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
    top: 200px;
    color: white;
    z-index: 100;
}
}

.title{
    font-size: 40px;
    font-weight: bold;
    margin-bottom: 20px;
}

@media (max-width: 768px) {
    .title{
        font-size: 15px;
        font-weight: bold;
        margin-bottom: 5px;
    }
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

.why-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 20px;
    top: 20px;
    background-color: #ffffff00;
}




</style>