// 引入 Node.js 提供的头文件
#include <node_api.h>  

// 定义一个 JS 使用的函数
napi_value Method(napi_env env, napi_callback_info args) {  
    napi_value result;   
    // 创建一个内容为 world 的字符串
    napi_create_string_utf8(env, "world", NAPI_AUTO_LENGTH, &result);  
    return result;  
}  

// 定义初始化函数，exports 是一个对象，给 exports 设置的属性，可以在 JS 层使用
napi_value init(napi_env env, napi_value exports) {  
    napi_value fn;
    // 创建一个函数
    napi_create_function(env, NULL, 0, Method, NULL, &fn);  
    // 给 exports 对象设置一个 hello 属性
    napi_set_named_property(env, exports, "hello", fn);  
    // 导出这个对象到 JS 层使用
    return exports;  
}  

// 设置初始化配置
NAPI_MODULE(NODE_GYP_MODULE_NAME, init)  