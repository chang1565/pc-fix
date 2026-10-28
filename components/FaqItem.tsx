type FaqItemProps = { question: string; answer: string };

export default function FaqItem({ question, answer }: FaqItemProps) {
  return <details className="faq-item"><summary>{question}</summary><p>{answer}</p></details>;
}
