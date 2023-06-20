import instance from "../utils/request"
// 登录
export const postloginReq = (data) => {
    // 为什么要return，因为promise才有.then的用法，所以需要return这个东西
    return instance({
        method: "post",
        url: "/users/checkLogin",
        data,
    });
};
// 检查账号是否重复
export const postuserrepeatReq = (data) => {
    return instance({
        method: "post",
        url: "/users/repeat",
        data,
    });
};
// 添加用户
export const postadduserReq = (data) => {
    return instance({
        method: "post",
        url: "/users/add",
        data,
    });
};
// 删除用户
export const getdelyserReq = (params) => {
    return instance({
        method: "GET",
        url: "/users/del",
        params,
    });
};
// 批量删除用户
export const postbatchdeluserReq = (data) => {
    return instance({
        method: "post",
        url: "/users/batchdel",
        data,
    });
};
// 修改账户
export const postusereditReq = (data) => {
    return instance({
        method: "post",
        url: "/users/edit",
        data,
    });
};
// 验证就密码
export const getcheckoldpass = (params) => {
    return instance({
        method: "GET",
        url: "/users/checkoldpwd",
        params,
    });
};
// 更改密码
export const postchangepass = (data) => {
    return instance({
        method: "post",
        url: "/users/editpwd",
        data,
    });
};
// 获取用户列表
export const getuserlist = (params) => {
    return instance({
        method: "GET",
        url: "/users/list",
        params,
    });
};
// 获取用户个人中心
export const getuserinfo = (params) => {
    return instance({
        method: "GET",
        url: "/users/info",
        params,
    });
};
// 修改用户头像
export const getavataredit = (params) => {
    return instance({
        method: "GET",
        url: "/users/avataredit",
        params,
    });
};
// 获取商品分类列表
export const getgoodscatelist = (params) => {
    return instance({
        method: "GET",
        url: "/goods/catelist",
        params,
    });
};
// 添加分类
export const postaddgoodsreq = (data) => {
    return instance({
        method: "post",
        url: "/goods/addcate",
        data,
    });
};
// 修改分类
export const posteditgoodsclareq = (data) => {
    return instance({
        method: "post",
        url: "/goods/editcate",
        data,
    });
};
// 删除分类
export const getdelclassfyreq = (params) => {
    return instance({
        method: "get",
        url: "/goods/delcate",
        params,
    });
};
// 添加商品
export const postgoodsaddreq = (data) => {
    return instance({
        method: "post",
        url: "/goods/add",
        data,
    });
};
// 获取商品列表
export const getgoodslistreq = (params) => {
    return instance({
        method: "get",
        url: "/goods/list",
        params,
    });
};
//查询所有启用的分类名称
export const getcategoriesreq = (params) => {
    return instance({
        method: "get",
        url: "/goods/categories",
        params,
    });
};
// 删除商品
export const getdelgoodsreq = (params) => {
    return instance({
        method: "get",
        url: "/goods/del",
        params,
    });
};
// 修改商品
export const postgoodseditreq = (data) => {
    return instance({
        method: "post",
        url: "/goods/edit",
        data,
    });
};
// 获取订单报表
export const getordertotalreq = (params) => {
    return instance({
        method: "get",
        url: "/order/ordertotal",
        params,
    });
};
// 首页报表接口
export const gettotaldatareq = (params) => {
    return instance({
        method: "get",
        url: "/order/totaldata",
        params,
    });
};
// 获取订单列表
export const getorderlistreq = (params) => {
    return instance({
        method: "get",
        url: "/order/list",
        params,
    });
};
// 获取订单列表
export const getorderdetailreq = (params) => {
    return instance({
        method: "get",
        url: "/order/detail",
        params,
    });
};
// 修改订单列表
export const postchangeorderreq = (data) => {
    return instance({
        method: "POST",
        url: "/order/edit",
        data,
    });
};
// 获取店铺详情
export const getshopinforeq = (params) => {
    return instance({
        method: "get",
        url: "/shop/info",
        params,
    });
};
// 修改店铺内容
export const postshopeditreq = (data) => {
    return instance({
        method: "post",
        url: "/shop/edit",
        data,
    });
};