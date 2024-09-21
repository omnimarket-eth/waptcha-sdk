export class WaptchaSDK {
  constructor(waptchaUrl, waptchaId) {
    this.waptchaUrl = waptchaUrl
    this.waptchaId = waptchaId
  }

  async verify() {
    const waptcha = await this.getWaptcha(this.waptchaId)

    if (!waptcha) return false

    const verifiedAt = waptcha.verified_at
    if (!verifiedAt) {
      return false
    }

    const now = new Date()
    const twentyFourHoursAgo = now - (24 * 60 * 60 * 1000);
    const verifiedAtDate = new Date(verifiedAt)
    if (verifiedAtDate.getTime() < twentyFourHoursAgo) {
      return false
    }

    return true
  }

  getWaptchaVerifyUrl() {
    return `${this.waptchaUrl}/waptcha/${this.waptchaId}`
  }

  async getWaptcha() {
    const res = await fetch(`${this.waptchaUrl}/waptchas/${this.waptchaId}`)
    if (!res.ok) return null
    const data = await res.json()
    return data
  }
}
