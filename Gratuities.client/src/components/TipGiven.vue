<template>
    <div class="rounded col-12 tips my-1">
        <div class="row align-items-center">
            <div class="col-3">
                <img class="profile-picture border border-dark border-1" :src="tip?.receiver.picture"
                    :alt="tip?.receiver.name">
            </div>
            <div class="col-9">
                <p>
                    {{ tip?.receiver.name }} - ${{ ((tip?.tip).toLocaleString('en-US')) }}
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


<style lang="scss" scoped>
.profile-picture {
    height: 8vh;
    width: 8vh;
    border-radius: 50%;
    object-fit: cover;
    background-position: center;
}
</style>