export default{
    namespace:'global',
    state: {
        pageChange:false,
        pageAnimation:false,
        loading:true,
        scale:getScale(),
        linkUrl:''
    },
    reducers:{
        pageChange(state,{payload}){
            return {
                ...state,
                pageChange:payload,
            }
        },
        handlePageAnimation(state,{payload}){
            return {
                ...state,
                pageAnimation:payload,
            }
        },
        handleLoading(state,{payload}){
            return {
                ...state,
                loading:payload
            }
        },
        handleLinkUrl(state,{payload}){
            return {
                ...state,
                linkUrl:payload
            }
        }
    }
}
function getScale(){
    var e, t, n, r, i, s, o, u, a, f;
    return e = !!navigator.userAgent.match(/iPhone/i), t = typeof window.orientation == "number" ? window.orientation : !1, n = t === 0 || t === 180 || t === -180 || t === 360 ? !0 : !1, r = document.documentElement.clientWidth, i = document.documentElement.clientHeight, s = r / 1024, o = i / 672, u = t && n ? s : Math.min(s, o), a = Math.round(u * 100) / 100, a
}