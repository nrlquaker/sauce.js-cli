import { Sauce } from 'sauce.js'

export default class OutputFormatter {
    public format(sauce: Sauce | null, filename: string): string {
        if (sauce) {
            return this.formatSauce(sauce!, filename)
        }
        return `${filename} does not have a SAUCE record.`
    }

    private formatSauce(sauce: Sauce, filename: string): string {
        return `${filename}:` +
            `\nId: ${sauce.id}` +
            `\nTitle: ${sauce.title}` +
            `\nAuthor: ${sauce.author}` +
            `\nGroup: ${sauce.group}` +
            `\nDate: ${this.formatDate(sauce.date)}` +
            `\nFilesize: ${sauce.fileSize}` +
            `\nDatatype: ${sauce.dataType.name}. ${sauce.dataType.description}` +
            `\nFiletype: ${sauce.fileType}` +
            `\nTInfo1: ${sauce.tInfo1}` +
            `\nTInfo2: ${sauce.tInfo2}` +
            `\nTInfo3: ${sauce.tInfo3}` +
            `\nTInfo4: ${sauce.tInfo4}` +
            this.formatComments(sauce.comments) +
            `\nFlags: ${sauce.flags}` +
            `\nTInfoS: ${sauce.tInfoS}`
    }

    private formatDate(date: Date): string {
        const month = this.addLeadingZero(date.getMonth() + 1)
        const day = this.addLeadingZero(date.getDate())
        return `${date.getFullYear()}/${month}/${day}`
    }

    private addLeadingZero(num: number): string {
        return num < 10 ? `0${num}` : `${num}`
    }

    private formatComments(comments: Array<string>): string {
        return comments.length > 0 ? '\nComments: ' + comments.join('\n  ') : ''
    }
}
