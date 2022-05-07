import { FeedbackRepository } from "../repositories/feedbacks-repositories";
import { MailAdapter } from "../adapters/mail-adapter";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbackRepository,
    private mailAdapter: MailAdapter
  ) {
    this.feedbacksRepository = feedbacksRepository;
  }

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if (!type) throw new Error("Type is required.");
    if (!comment) throw new Error("Comment is required.");

    if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new Error("Invalid screenshot format.");
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: "Novo Feedback",
      body: [
        `<div style="font-family: sans-serif;font-size: 16px;color: #fff;background: #272727;padding: 1rem 2rem;border-radius: 10px;display: flex;justify-content: center;align-items:center;flex-direction: column;flex: 1;">`,
        `<p>Tipo de feedback: ${type} </p>`,
        `<p>Comentários: ${comment}</p>`,
        screenshot
          ? `<img src="${screenshot}" style="max-width:100%;height:auto" />`
          : null,
        `</div>`,
      ].join("\n"),
    });
  }
}
