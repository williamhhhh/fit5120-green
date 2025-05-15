<template>

<div class="line-container">
    <div class="line">
    </div>
</div>

<div class="container-fluid">
      <div class="row">

        <!-- Website Description -->
        <div class="col-12 col-md-3 mb-4 mb-md-0 website-desc-container">
          <h1 class="website-desc">Cool the City</h1>
          <p class="website-desc-text">
            Join us in tackling urban heat and reducing CO2 emissions through small, everyday actions.
          </p>
          <div class="icon-container">
            <img src="" alt="" class="website-icon">
            <img src="" alt="" class="website-icon">
            <img src="" alt="" class="website-icon">
          </div>
        </div>

        <!-- Platform Section -->
        <div class="col-6 col-md-2 mb-4 mb-md-0 platform-container">
        <div class="platform-title-container">
            <h5 class="fw-bold">Platform</h5>
        </div>
          <ul class="list-unstyled">
            <li><router-link to="/home" class="footer-link">Home</router-link></li>
            <li><router-link to="/greenmap" class="footer-link">Map</router-link></li>
            <li><router-link to="/chat" class="footer-link">Chat</router-link></li>
            <li><router-link to="/calculator" class="footer-link">Calculator</router-link></li>
          </ul>
        </div>

        <!-- Learn Section -->
        <div class="col-6 col-md-2 mb-4 mb-md-0 learn-container">
            <div class="learn-title-container">
                <h5 class="fw-bold">Learn</h5>
            </div>
          <ul class="list-unstyled">
            <li><router-link to="/greenadvice" class="footer-link">Green Advice</router-link></li>
            <li><router-link to="/storytelling" class="footer-link">Stories</router-link></li>
            <li><a href="https://example.com/blog" target="_blank" class="footer-link">Blog</a></li>
          </ul>
        </div>

        <!-- About Section -->
        <div class="col-6 col-md-2 mb-4 mb-md-0 about-container">
          <div class="about-title-container">
            <h5 class="fw-bold">About</h5>
          </div>
          <ul class="list-unstyled">
            <li><router-link to="/about" class="footer-link">Our Mission</router-link></li>
            <li><router-link to="/team" class="footer-link">Team</router-link></li>
          </ul>
        </div>

        <!-- Contact Section -->
        <div class="col-6 col-md-3 contact-container">
            <div class="contact-title-container">
                <h5 class="fw-bold">Contact Us</h5>
            </div>

          <ul class="list-unstyled">
            <li><a href="mailto:info@coolcity.org" class="footer-link">info@coolcity.org</a></li>
            <li><a href="https://instagram.com/yourpage" class="footer-link" target="_blank">Instagram</a></li>
          </ul>
        </div>
      </div>
    </div>

</template>

<script setup>

</script>

<style scoped>


.line-container{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
}

.line{
    border: 0.5px solid #B8B8B8;
    transform: rotate(0.16deg);
    width:95%;
    justify-content: space-between;
}

.container-fluid {
    padding-left: 100px;
    padding-right: 100px;
    padding-top: 50px;
    align-items: flex-start;

}

.website-desc-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;
}

.platform-container{
    display: flex;
    flex-direction: column;

}

.platform-title-container{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.learn-container{
    display: flex;
    flex-direction: column;

}

.learn-title-container{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.about-container{
    display: flex;
    flex-direction: column;

}

.about-title-container{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.contact-container{
    display: flex;
    flex-direction: column;


}

.contact-title-container{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.website-desc{
    font-family: 'Cera Pro';
font-style: normal;
font-weight: 500;
font-size: 36px;
line-height: 45px;
text-transform: uppercase;

/* black */
color: #202020;
}

.website-desc-text{
    font-family: 'Rubik';
font-style: normal;
font-weight: 400;
font-size: 18px;
line-height: 25px;
/* or 139% */

/* text color */
color: #615E5B;
}

fw-bold{
    /* Title */

font-family: 'Cera Pro';
font-style: normal;
font-weight: 500;
font-size: 24px;
line-height: 30px;

/* black */
color: #202020;


}

.icon-container{
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    flex-direction: row;
    gap: 10px;
}
.list-unstyled {
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    align-items: center;
}

.footer-link {
    font-family: 'Cera Pro';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 20px;

/* text color */
color: #615E5B;
}

</style>