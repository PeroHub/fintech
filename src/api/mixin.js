export const parseError = (error) => {
  const data = { error: '' }
  if (error?.response?.data) {
    data.error = error.response.data
  } else if (error?.response?.status) {
    data.error = error.response.statusText
  } else {
    data.error = error.message
  }

  return data
}


export const storage = {

  clearData: function () {
    sessionStorage.clear()
  },

  writeData: function (data, prefix) {
    sessionStorage.setItem(prefix, JSON.stringify(data))
  },

  getData: function (prefix) {
    return JSON.parse(sessionStorage.getItem(prefix), '{}')
  }
}