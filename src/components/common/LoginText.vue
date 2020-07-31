<template>
    <div>
        <van-field 
            v-model="text" 
            :label="label" 
            :type="type" 
            :placeholder="placeholder" 
            :rule="rule"
        >
        </van-field>

    </div>
</template>

<script>
export default {
    props: {
        label: String,
        type: String,
        placeholder: String,
        rule: String
    },
    data() {
        return {
            //输入框文本内容
            text: ''
        }
    },
    methods: {
        /**
        * @func
        * @desc 应用正则
        */
        applyRegExp() {
            //字符串构建正则表达式
            const rule = new RegExp(this.rule);
            if (rule.test(this.text)) {
                //输入通过正则校验，触发事件
                this.$emit("inputChange", this.text);
            }
        },
    },
    watch: {
        //watch text（输入变化）
        text() {
            this.applyRegExp();
        }
    }
}
</script>

<style lang='scss' scoped>

</style>