<template>
    <div id="daily">
        <div class="daily-menu">
            <div class="daily-menu-item"
                @click="handleRecommend"
                :class="{ on: type === 'recommend'}" >每日推荐</div>
            <!-- 由于主题日报api失效，所以这块无所谓，写上来练手 -->
            <div class="daily-menu-item"
                :class="{ on: type === 'theme'}"
                @click="toThemes">主题日报</div>
        </div>
        <div class="daily-list">
            <template v-if="type === 'recommend'">
                <!-- //加了一个能够按日期加载更多的功能 -->
                <div v-for="(date, index) in prevDay"
                    :key="date">
                        <div class="daily-date animated bounceInDown"> {{ formatDay(date) }} </div>
                        <Item v-for="item in recommendList[index]" class="animated bounceInDown"
                            :data="item"
                            :key="item.id"
                            @get-artical="getArtical(item)"></Item>
                </div>
                <a class="load-more animated bounceInUp" 
                   @click="loadMore($event)">加载更多...</a>
            </template>
            <!-- 主题日报list 略 -->
            <template v-else>
                <strong>API失效辣！</strong>
            </template>
        </div>
        <!-- 判断articla是否为空对象 -->
        <daily-artical v-if="JSON.stringify(artical) != '{}' && type === 'recommend'"
            :data="artical"
            :title="title"
            :comments="comments"></daily-artical>
    </div>
</template>

<script>
import $ from '../libs/util.js'
import axios from 'axios'
import Item from './components/Item'
import dailyArtical from './components/daily-article'
// import '../animate.css'

export default {
    name: 'daily',
    data() {
        return {
            //themes: [] 由于主题日报api失效，所以没用了，后面失效的也不写了
            type: 'recommend',
            recommendList: [],
            dailyTime: $.getTodayTime(),
            isLoading: false,
            // list: [],
            prevDay: [],
            artical: {},
            title: "",
            comments: []
        }
    },
    components: {
        Item,
        dailyArtical,
    },
    methods: {
        //切换主题，由于api失效了就没写
        toThemes() {
            this.type = 'theme';
        },
        handleRecommend() {
            this.dailyTime = $.getTodayTime();
            this.type = 'recommend';
            this.recommendList = [];
            this.getRecommendList();
        },
        //获取推荐列表和prevDay日期
        getRecommendList() {
            this.isLoading = true;
            this.prevDay = [];
            let prevDay = $.prevDay(this.dailyTime + 86400000);
            this.prevDay.push($.prevDay(this.dailyTime));
            $.ajax.get('news/before/'+prevDay).then(response => {
                this.recommendList.push(response.stories);
                this.isLoading = false;
            })
        },
        //格式化输出日期格式‘xx月xx日’
        formatDay(date) {
            date = String(date);
            let month = date.substr(4, 2);
            let day = date.substr(6, 2);
            if(month.substr(0, 1) === '0') month = month.substr(1, 1);
            if(day.substr(0, 1) === '0') day = day.substr(1, 1);
            return `${month}月${day}日`;
        },
        //getArtical和comments应该封装到daily-artical中，这样写的话会导致父子组件高耦合...但是我已经写完了...
        getArtical(item) {
            $.ajax.get('news/' + item.id).then(response => {
                this.title = "";
                this.artical = response;
                this.title = item.title;
                this.getComments(item);
            });
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        },
        getComments(item) {
            $.ajax.get(`story/${item.id}/short-comments`).then(response => {
                this.comments = response.comments;
            })
        },
        loadMore(event) {
            this.isLoading = true;
            this.dailyTime -= 86400000;
            let prevDay = $.prevDay(this.dailyTime + 86400000);
            this.prevDay.push($.prevDay(this.dailyTime));
            $.ajax.get('news/before/'+prevDay).then(response => {
                this.recommendList.push(response.stories);
                this.isLoading = false;
            })
        }
    },
    mounted() {
        this.getRecommendList();
    }
}
</script>

<style>
    html, body {
        margin: 0;
        padding: 0;
        height: 100%;
        color: #657180;
        font-size: 16px;
        text-align: center;
    }
    .daily-menu {
        position: fixed;
        top: 0; left: 0; bottom: 0;
        width: 150px;
        background-color: #eee;
        font-size: 20px;
        line-height: 2em;
        text-align: center;
    }
    .daily-menu-item {
        margin-top: 5px;
        border-right: 2px solid transparent;
        transition: all .2s ease-in-out;
        cursor: pointer;
    }
    .daily-menu-item:hover {
        background-color: #e3e8ee;
    }
    .daily-menu-item.on {
        border-right: 2px solid #3399ff;
    }
    .daily-list {
        width: 300px;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 150px;
        border-right: 1px solid #eee;
        overflow: auto;
    }
    .daily-list .load-more {
        display: block;
        text-align: center;
        background-color: #eee;
        padding: 5px 0;
        margin: 0 10px;
        border-radius: 5px;
        color: #657180;
        text-decoration: none;
        cursor: pointer;
    }
    .daily-date {
        text-align: center;
        margin: 10px 0;
    }
</style>
