export default (option) => {
  return new Promise((resolve, reject) => {
    if (window.WeixinJSBridge) {
      window.WeixinJSBridge.invoke(
        'getBrandWCPayRequest', option,
        function (res) {
          if (res.err_msg == 'get_brand_wcpay_request:ok') {
            resolve(res)
          } else if (res.err_msg == 'get_brand_wcpay_request:cancel') {
            reject({
              success: false,
              message: res.err_desc
            })
          } else {
            reject({
              success: false,
              message: res.err_desc,
            })
          }
        }
      )
    }
  })

}