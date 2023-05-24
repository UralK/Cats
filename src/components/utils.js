export function getCookie() {
    return document.cookie.split('; ').reduce((acc, item) => {
      const [name, value] = item.split('=')
  
      return { ...acc, [name]: value }
    }, {})
  }

  console.log(getCookie());
  
  export function deleteCookie(key) {
    document.cookie = `${key}=;expires=${new Date(0)}`
  }