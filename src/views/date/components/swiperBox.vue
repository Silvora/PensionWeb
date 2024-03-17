<template>
    <!-- :centeredSlides="true" navigation -->
    <swiper :clickable="true" :modules="modules" :grabCursor="true" slidesPerView="auto" :slides-per-view="3"
        :crossFade="true" :effect="'coverflow'" :coverflowEffect="{
            'rotate': 50,
            'stretch': 20,
            'depth': 100,
            'modifier': 1,
            'slideShadows': true
        }" :initialSlide="1" :loop="true" @swiper="onSwiper" @slideChange="onSlideChange">
        <swiper-slide>
            <Image src="https://swiperjs.com/demos/images/nature-1.jpg" fit="fill" height="160px" />
        </swiper-slide>
        <swiper-slide>
            <Image src="https://swiperjs.com/demos/images/nature-2.jpg" fit="fill" height="160px" />
        </swiper-slide>
        <swiper-slide>
            <Image src="https://swiperjs.com/demos/images/nature-3.jpg" fit="fill" height="160px" />
        </swiper-slide>
        <swiper-slide>
            <Image src="https://swiperjs.com/demos/images/nature-4.jpg" fit="fill" height="160px" />
        </swiper-slide>
        <swiper-slide>
            <Image src="https://swiperjs.com/demos/images/nature-5.jpg" fit="fill" height="160px" />
        </swiper-slide>
        <swiper-slide>
            <Image src="https://swiperjs.com/demos/images/nature-6.jpg" fit="fill" height="160px" />
        </swiper-slide>
    </swiper>
</template>

<script setup lang='ts'>
import { ref } from "vue"
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Scrollbar, A11y, EffectFade, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/scss/effect-coverflow'
import 'swiper/scss/effect-fade'

const activeIndex = ref(1)

const onSwiper = (swiper) => {
    console.log(swiper);
};
const onSlideChange = () => {
    console.log('slide change');
};
const modules = ref([Navigation, Pagination, Scrollbar, A11y, EffectFade, EffectCoverflow])
// onMounted(() => {
//     console.log("first")
//     register();
// })
</script>

<style scoped lang='less'></style>