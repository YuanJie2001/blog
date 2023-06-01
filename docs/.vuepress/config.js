module.exports = {
    base: './', //目标地址是：https://openhacking.github.io/vuepress-template/，所以需要配置base地址后缀
    port: 12315,
    head: [
        [
            'link', { rel: 'icon', href: 'logo.png' }
        ]
    ],
    locales: {
        // 键名是该语言所属的子路径
        // 作为特例，默认语言可以使用 '/' 作为其路径。
        '/': {
            lang: 'zh-CN',
            title: '渊洁的秘密基地',
            description: '开源:我为人人，人人为我'
        },
        '/en/': {
            lang: 'en-US', // 将会被设置为 <html> 的 lang 属性
            title: 'YuanJie\'s Secret Base',
            description: 'Open source: I am for everyone, everyone is for me'
        }
    },
    plugins: [
        '@vuepress/back-to-top',
        ['qrcode', {
            // "/" and "/en/" correspond to the path set by locales
            labelText: {
                "/": "二维码",
                "/en/": "QRCode",
            },
            size: 'small',
            channel: true
        }]
    ],
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        logo: 'logo.png',
        search: true,
        searchMaxSuggestions: 10,
        lastUpdated: '最后更新时间',
        // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
        repo: 'YuanJie2001/blog',
        // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
        // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
        repoLabel: '查看源码',

        // 以下为可选的编辑链接选项
        // 假如你的文档仓库和项目本身不在一个仓库：
        docsRepo: 'YuanJie2001/blog',
        // 假如文档不是放在仓库的根目录下：
        docsDir: 'docs',
        // 假如文档放在一个特定的分支下：
        docsBranch: 'main',
        // 默认是 false, 设置为 true 来启用
        editLinks: true,
        // 默认为 "Edit this page"
        editLinkText: '帮助我们改善此页面！',


        locales: {
            '/': {
                // 多语言下拉菜单的标题
                selectText: '语言',
                // 该语言在下拉菜单中的标签
                label: '简体中文',
                // 编辑链接文字
                editLinkText: '在 GitHub 上编辑此页',
                // Service Worker 的配置
                serviceWorker: {
                    updatePopup: {
                        message: "发现新内容可用.",
                        buttonText: "刷新"
                    }
                },
                // 当前 locale 的 algolia docsearch 选项
                algolia: {},
                nav: [
                    {text: '指南', link: '/guide/', ariaLabel: '指南'},
                    {text: '文章', link: '/article/', ariaLabel: '文章'},
                    {
                        text: '其他链接',
                        items: [
                            {text: 'Github', link: 'https://github.com/YuanJie2001'},
                            {text: 'CSDN', link: 'https://blog.csdn.net/m0_50913327?spm=1000.2115.3001.5343'}]
                    }

                ],
                sidebar: {
                    '/guide/': [
                        '',
                        'theme',
                        'plugin'
                    ],
                    '/article/': [
                        '',
                        'mysql',
                        'redis',
                        'go-gin-gorm',
                        'database-change',
                        'dubbo-problem-solving',
                        'netty',
                        'lomback-log4j-log',
                        'snow_flake',
                        'springboot-common-utils',
                        'policy-mode',
                        'jpa-complex-query',
                        'ELK',
                        'distributed-transaction',
                    ],
                    '/resource/': []
                }
            },
            '/en/': {
                selectText: 'Languages',
                label: 'English',
                ariaLabel: 'Languages',
                editLinkText: 'Edit this page on GitHub',
                serviceWorker: {
                    updatePopup: {
                        message: "New content is available.",
                        buttonText: "Refresh"
                    }
                },
                algolia: {},
                nav: [
                    {text: 'Guide', link: '/en/guide/', ariaLabel: 'Guide'},
                    {text: 'article', link: '/en/article/', ariaLabel: 'article'},
                    {
                        text: 'other links',
                        items: [
                            {text: 'Github', link: 'https://github.com/YuanJie2001'},
                            {text: 'CSDN', link: 'https://blog.csdn.net/m0_50913327?spm=1000.2115.3001.5343'}]
                    }
                ],
                sidebar: {
                    '/en/guide/': [
                        '',
                        'theme',
                        'plugin'
                    ],
                    '/en/article/': [
                        '',
                        'go-gin-gorm',
                        'database-change',
                        'Dubbo-problem-solving'
                    ],
                    '/en/resource/': []
                }
            }
        }
    },
}