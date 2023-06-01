module.exports = {
    base: '/blog/', //目标地址是：https://openhacking.github.io/vuepress-template/，所以需要配置base地址后缀
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
                        'go-gin-gorm',
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
                    '/en/article/': [],
                    '/en/resource/': []
                }
            }
        }
    },
}