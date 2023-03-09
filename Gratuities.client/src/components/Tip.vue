<template>
    <div class="rounded col-12 tips my-1">
        <div class="row align-items-center">
            <div class="col-3">
                <img class="profile-picture" :src="tip?.creator.picture" :alt="tip?.creator.name">
            </div>
            <div class="col-9">
                <p>
                    {{ tip?.creator.name }}
                    <br>
                    <i class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i><i
                        class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i>
                    <br>
                    "Customer service is my passion"
                </p>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    props: {
        tip: { type: Object, required: true }
    },
    setup() {
        return {

        }
    }
}
</script>


<style lang="scss" scoped></style>