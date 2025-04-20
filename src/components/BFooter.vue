<template>
    <div class="container-footer">
        <div class="footer">
            <div class="footer-content">
                <div class="logo-links">
                    <div class="logo-text">
                            <div class="logo-text-title">Sustainably Melb | Making Melbourne Cooler & Greener</div>
                            <div class="logo-text-location">Melbourne, Australia</div>
                            <div class="logo-text-support">Together, we can create a greener city!</div>
                    </div>
                    <div class="footer-links">
                        <a href="#">About Us</a>
                        <a href="#">Contact Us</a>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>

                <div class="stay-connected">
                    <div class="stay-connected-heading">
                    </div>

                    <div class="email-capture">
                        <input type="email" placeholder="Enter your email" />
                        <button>Subscribe</button>
                    </div>    
                </div>
            </div>
        </div>
        <div class="contact-container">
        </div>
    </div>
    
</template>

<script setup>

</script>

<style scoped>

.container-footer {
    /* Auto layout */
display: flex;
flex-direction: column;
align-items: center;
padding: 64px 0px 48px;
gap: 64px;

position: relative;
width: 100%;
/* MAX-width: 1280px; */
height: 472px;
left: 0px;
bottom: 0px;
top: 30px;

background: #90CF8E;
}

.footer {
/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 48px;
margin: 0 auto;
width: 1280px;
max-width: 1280px;
height: 240px;

/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
}

@media (min-width: 768px) {
    .footer-content {
/* Auto layout */
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;
gap: 50px;
width: 100%;
height: 240px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
}
}


@media (max-width: 768px) {
    .footer-content {
        flex-direction: column;
        align-items: center;
        gap: 32px;
    }
}

    .logo-links {
    /* Auto layout */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 32px;

    margin: 0 auto;
    width: 400px;
    height: 240px;


    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 0;
    }



@media (min-width: 768px) {
    .logo-text-title {
    /* Auto layout */
    width: 520px;
    height: 106px;

    font-family: 'Domaine Display Narrow';
    font-style: italic;
    font-weight: 600;
    font-size: 32px;
    line-height: 53px;
    /* or 166% */
    display: flex;
    align-items: center;

    color: #000000;
}
}

@media (max-width: 768px) {
    .logo-text-title {
    /* Auto layout */
    width: 350px;
    height: 130px;

    font-family: 'Domaine Display Narrow';
    font-style: italic;
    font-weight: 600;
    font-size: 32px;
    line-height: 53px;
    /* or 166% */
    display: flex;
    align-items: center;

    color: #000000;
}
}


.logo-text-location {
    /* Supporting text */
width: 520px;
height: 24px;

/* Text md/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 24px;
/* identical to box height, or 150% */

color: #000000;


/* Inside auto layout */
flex: none;
order: 1;
align-self: stretch;
flex-grow: 0;
}

.logo-text-support {
    width: 520px;
height: 24px;

/* Text md/Regular */
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 24px;
/* identical to box height, or 150% */

color: #000000;


/* Inside auto layout */
flex: none;
order: 2;
align-self: stretch;
flex-grow: 0;
}



@media (min-width: 768px) {
    .footer-links {
        /* Auto layout */
        /* Auto layout */
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 32px;

    width: 520px;
    height: 24px;


    /* Inside auto layout */
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
    }
}

@media (max-width: 768px) {
    .footer-links {
        /* Auto layout */
        /* Auto layout */
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 5px;

    width: 520px;
    height: 24px;


    /* Inside auto layout */
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
    }
}


.a {
    /* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 8px;

width: 46px;
height: 24px;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
}

@media (min-width: 768px) {
.stay-connected {
/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 16px;

margin: 0 auto;
width: 360px;
height: 88px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;
}
}

@media (max-width: 768px) {
.stay-connected {
/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 16px;

margin: 0 auto;
width: 360px;
height: 88px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;
}
}

.stay-connected-heading {
    /* Auto layout */
    width: 360px;
height: 20px;

/* Text sm/Medium */
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 20px;
/* identical to box height, or 143% */

color: #000000;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
}

@media (min-width: 768px) {
.email-capture {
    /* Auto layout */
    /* Auto layout */
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    gap: 16px;

    width: 360px;
    height: 52px;


    /* Inside auto layout */
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
}
}

@media (max-width: 768px) {
.email-capture {
    /* Auto layout */
    /* Auto layout */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 16px;

    width: 360px;
    height: 52px;


    /* Inside auto layout */
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
}
}

.email-capture input {
    box-sizing: border-box;

    /* Auto layout */
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px 14px;
    gap: 8px;

    width: 217px;
    height: 52px;

    border: 1px solid rgba(0, 0, 0, 0.4);
    /* Shadows/shadow-xs */
    filter: drop-shadow(0px 1px 2px rgba(16, 24, 40, 0.05));
    border-radius: 8px;

    /* Inside auto layout */
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
}

.email-capture button {
    /* Auto layout */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 14px 22px;
    gap: 12px;

    width: 127px;
    height: 52px;

    background: #0D9B27;
    border-radius: 48px;

    /* Inside auto layout */
    flex: none;
    order: 1;
    flex-grow: 0;
}



</style>