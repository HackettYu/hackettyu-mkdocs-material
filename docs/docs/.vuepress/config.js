// const getConfig = require("vuepress-bar");

module.exports = {

    lastUpdated: 'Last Updated', // string | boolean

    // permalink: '/:year/:month/:day/:slug',  //固定链接的全局配置
    markdown: {  //markdown编辑器的配置
        lineNumbers: true,   //代码显示行号，默认 false
        toc: { includeLevel: [1, 2, 3] },   //显示目录的默认层级
    },
    title: 'hackettyu\'s note',  //网站的标题，默认主题几个地方用到
    description: 'study note', //网站的描述
    base: '/', //要部署的根目录，不配置的话，都会到网站根目录下面
    themeConfig: {  //主题的配置信息
        nav: [  //导航栏配置
            { text: '首页', link: '/' },  //没有子导航的，显示文字和链接
            // { text: '基础', items: [  //有自导航的，就显示文字和子导航对象，下同
            //   { text: '入门', link: '/base/base' },
            //   { text: '常见文件', link: '/base/file' },
            //   { text: '组件化', link: '/base/package' },
            //   { text: 'ES6新特性', link: '/base/es6' },
            // ]},
            // { text: '核心', items: [
            //   { text: '路由Router', link: '/core/Route' },
            //   { text: '状态Vuex', link: '/core/Vuex' },
            // ]},
            // { text: '工具', items: [
            //   { text: 'git', link: '/tools/git' },
            //   { text: 'webpack', link: '/tools/webpack' },
            // ]},
            // { text: '博客', link: 'https://notes.tingno.com' }, //链接也可以是外部链接
        ],
        sidebar: 'auto',
        // sidebar: [  
        // 自动生成
        //配置边栏的链接，一个对象、一个数组都可以。也可以分组，分组配置找官方。
        // '/',  //默认配置链接，名称会自动生成，首页或者文件第一个标题
        // ['/base/base','入门'],  //或者指定链接和显示标题
        // ['/docs/node_5', 'note5'],  
        // ['/base/file', '常见文件'],
        // ['/base/package', '组件化'],
        // { //复杂的带子目录的对象
        //   title: '核心',  //显示名称
        // ...getConfig(`${__dirName}/..`),
    },

    // 开启插件
    plugins: [
        ['@vuepress/search', {
            searchMaxSuggestions: 20  // 最大的搜索数量
        }],

        ['@vuepress/google-analytics', {
            ga: 'UA-146236033-2'
        }]
    ]

    // ga: ['UA-146236033-2']
}