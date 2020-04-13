export class HN_Email {
    emailId: number
    sender: string
    subject: string
    body: string
}

export class HN_EmailAttachment {
    attachmentId: number
    typeId: number
    title: string
    content: string
    comp: string
    user: string
    pass: string
}

export class HN_AttachmentType {
    typeId: number
    typeText: string
}