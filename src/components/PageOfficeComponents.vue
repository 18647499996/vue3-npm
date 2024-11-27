<template>
    <div>
        <div id='vabOnlyOffice'></div>
    </div>
</template>
<script>
export default {
    name: 'VabOnlyOffice',
    props: {
        option: {
            type: Object,
            default: () => {
                return {}
            },
        },
    },
    data() {
        return {
            doctype: '',
            docEditor: null,
        }
    },
    beforeDestroy() {   //检查并销毁文档编辑器实例
        if (this.docEditor !== null) {
            this.docEditor.destroyEditor();
            this.docEditor = null;
        }
    },
    watch: {  //监视 option 属性的变化，当 option 发生改变时，调用相应的处理函数
        option: {
            handler: function (n) {
                this.setEditor(n)
                this.doctype = this.getFileType(n.fileType)
            },
            deep: true,
        },
    },
    mounted() {//组件挂载后,检查option.url是否存在,如果存在则调用setEditor方法进行编辑器的初始化设置
        if (this.option.url) {
            this.setEditor(this.option)
        }
    },
    methods: {
        async setEditor(option) { //setEditor 方法用于初始化编辑器。它接收一个参数 option，包含编辑器的各种配置选项。
            if (this.docEditor !== null) {
                this.docEditor.destroyEditor();
                this.docEditor = null;
            }
            this.doctype = this.getFileType(option.fileType)
            let config = {
                document: {
                    fileType: option.fileType,      // 文档类型
                    key: option.key || '',          // 唯一值key
                    title: option.title,            // 指定在编辑器中显示的文件名称
                    permissions: {                  //
                        edit: option.isEdit,          //是否可以编辑: 只能查看，传false
                        print: option.isPrint,
                        download: option.isDownload,
                        fillForms: true,              //是否可以填写表格，如果将mode参数设置为edit，则填写表单仅对文档编辑器可用。 默认值与edit或review参数的值一致。
                        review: true                  //跟踪变化
                    },
                    url: option.url,                // 指定需打开加载文档的URL
                },
                documentType: this.doctype,
                editorConfig: {
                    callbackUrl: option.callbackUrl, //编辑word后保存时回调的地址，这个回调用于后端接收你改变后的数据
                    lang: option.lang,              //语言设置
                    chat: {
                        autosave: true,              //是否自动保存
                        chat: false,
                        comments: false,
                        help: false,
                        //是否显示插件
                        plugins: false,
                    },
                    user: {   // 用户信息
                        id: option.user.id,
                        name: option.user.name
                    },
                    mode: option.model ? option.model : 'edit',
                },
                events: {
                    onAppReady: this.onAppReady,   // 调用此方法 应用程序被加载到浏览器中。
                    onDocumentStateChange: this.onDocumentStateChange,		//文档被修改。
                },
                width: '100%',       	// 定义浏览器窗口中的档高度（默认为 100%）。
                height: '800px',        // 定义浏览器窗口中的文档宽度（默认为 100%）。
                token: option.token || ""  // 安全令牌  
            }
            console.log('---config111----', config)
            this.docEditor = new DocsAPI.DocEditor('vabOnlyOffice', config)
        },
        onDocumentStateChange(event) { },  // 当文档被修改后调用
        onAppReady() {   //onAppReady 方法是一个回调函数，当 OnlyOffice 编辑器加载完成后调用
            this.connector = this.docEditor.createConnector();  // 创建connector连接器
            console.log(this.docEditor, '+++++++创建connector连接器创建connector连接器创建connector连接器++++++');
        },

        getFileType(fileType) { // getFileType 方法用于根据文件类型（fileType）返回对应的文档类型（docType）
            let docType = ''
            let fileTypesDoc = [
                'doc', 'docm', 'docx', 'dot', 'dotm', 'dotx', 'epub', 'fodt', 'htm', 'html', 'mht', 'odt', 'ott', 'pdf', 'rtf', 'txt', 'djvu', 'xps', 'word',
            ]
            let fileTypesCsv = [
                'csv', 'fods', 'ods', 'ots', 'xls', 'xlsm', 'xlsx', 'xlt', 'xltm', 'xltx',
            ]
            let fileTypesPPt = [
                'fodp', 'odp', 'otp', 'pot', 'potm', 'potx', 'pps', 'ppsm', 'ppsx', 'ppt', 'pptm', 'pptx',
            ]
            if (fileTypesDoc.includes(fileType)) {
                docType = 'text'
            }
            if (fileTypesCsv.includes(fileType)) {
                docType = 'spreadsheet'
            }
            if (fileTypesPPt.includes(fileType)) {
                docType = 'presentation'
            }
            return docType
        }
    },
}
</script>
<style scoped></style>