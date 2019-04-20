<!--  -->
<template>
    <div id="daily-artical">
        <div class="title"><h1>{{title}}</h1></div>
        <div class="artical" v-html="data.body"></div>
        <div class="comments">
            <p>评论({{comments.length}})</p>
            <div class="short-comment"
                v-for="comment in comments"
                :key="comment.id">
                    <div class="avatar">
                        <img :src="comment.avatar" alt="avatar">    
                    </div>
                    <div class="comment-text">
                        <div class="author">
                            {{ comment.author }}
                        </div>
                        <!-- 自定义指令获取时间戳转换 -->
                        <div class="time" v-time="comment.time"></div>
                        <div class="text">{{ comment.content }}</div>
                    </div>
            </div>
        </div>
        <slot></slot>
    </div>
</template>

<script>
import Time from '../../directives/time.js'

export default {
    name: "dailyArtical",
    directives: { Time },
    props: {
        data: Object,
        title: String,
        comments: Array
    }

}

</script>
<style>
    #daily-artical {
        margin-left: 450px;
        text-align: left;
        padding: 10px 30px;
    }
    .view-more {
        display: block;
        text-align: center;
        background-color: #eee;
        padding: 10px 0;
        border-radius: 5px;
    }
    .view-more a {
        color: #657180;
        text-decoration: none;
    }
    .comments {
        margin-top: 10px;
    }
    .short-comment {
        width: 100%;
        float: left;
        padding: 5px 0;
        margin: 5px 0;
        border-bottom: 1px dashed #eee;
    }
    .short-comment .avatar {
        float: left;
        width: 60px;
        height: 60px;
    }
    .short-comment .avatar img {
        border-radius: 3px;
        width: 100%;
        height: 100%;
    }
    .comment-text {
        float: left;
        margin-left: 10px;
        color: #657180;
        width: 90%;
    }
    .comment-text .author {
        color: #7a7180;
        font-size: 16px;
    }
    .comment-text .time {
        font-size: 14px;
        color: #9ea7b4;
        margin-top: -5px;
    }
    .comment-text .author, .time, .text {
        margin-bottom: 15px;
    }
</style>
