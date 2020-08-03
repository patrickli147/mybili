<template>
    <div class="edit-item">
        <span>{{leftMsg}}</span>
        <span>
            <slot></slot>
        </span>
    </div>
</template>

<script>
export default {
    props: ['leftMsg'],
}
</script>

<style lang='scss' scoped>
.edit-item {
    padding: 4.167vw;
    width: 100%;
    border-bottom: 0.278vw solid #eee;
    font-size: 3.889vw;
    color: #777;
    background-color: #fff;

    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>