import type { Metadata } from "next";
import { languageAlternates, localeFromPath, type Locale } from "./localization";

type StaticPage = "about" | "contact" | "privacy" | "terms";
const copy: Record<Locale, Record<StaticPage, readonly [string, string]>> = {
  ko: {
    about: ["사이트 소개 | PC FIX", "PC FIX의 컴퓨터 증상·오류 코드별 문제 해결 안내와 정보 제공 목적을 소개합니다."],
    contact: ["문의 | PC FIX", "PC FIX 콘텐츠 오류 신고, 수정 요청, 제휴와 기타 문의 방법을 안내합니다."],
    privacy: ["개인정보처리방침 | PC FIX", "PC FIX의 개인정보 처리, 쿠키와 외부 서비스, 광고 및 정책 변경 안내를 확인하세요."],
    terms: ["이용약관 | PC FIX", "PC FIX 서비스의 목적과 정보 이용, 데이터·장비 보호에 관한 이용약관입니다."],
  },
  en: {
    about: ["About PC FIX", "Learn about PC FIX and its guides to computer symptoms, Windows error codes, and troubleshooting."],
    contact: ["Contact | PC FIX", "Find how to report a content error, request a correction, or contact PC FIX about partnerships and other inquiries."],
    privacy: ["Privacy Policy | PC FIX", "Read PC FIX's policy on personal information, cookies, external services, advertising, and policy changes."],
    terms: ["Terms of Use | PC FIX", "Read the terms for using PC FIX's troubleshooting information and protecting your data and equipment."],
  },
  ja: {
    about: ["PC FIXについて", "PC FIXの運営目的と、パソコンの症状・Windowsエラーコード別のトラブル解決ガイドについて紹介します。"],
    contact: ["お問い合わせ | PC FIX", "PC FIXの記事の誤りや修正依頼、提携、その他のお問い合わせ方法をご案内します。"],
    privacy: ["プライバシーポリシー | PC FIX", "PC FIXの個人情報、Cookie、外部サービス、広告、方針の変更に関する説明をご確認ください。"],
    terms: ["利用規約 | PC FIX", "PC FIXの情報を利用する際の条件と、データや機器の保護に関する利用規約をご確認ください。"],
  },
  "zh-CN": {
    about: ["关于 PC FIX", "了解 PC FIX 的服务目的，以及按电脑故障现象和 Windows 错误代码整理的排查指南。"],
    contact: ["联系 | PC FIX", "查看如何向 PC FIX 反馈内容错误、提出修改建议，以及进行合作或其他咨询。"],
    privacy: ["隐私政策 | PC FIX", "查看 PC FIX 关于个人信息、Cookie、外部服务、广告和政策变更的说明。"],
    terms: ["使用条款 | PC FIX", "查看使用 PC FIX 排查信息时的相关条款，以及数据和设备保护方面的说明。"],
  },
};

export function staticPageMetadata(pathname: string): Metadata {
  const page = pathname.split("/").filter(Boolean).pop() as StaticPage;
  const entry = copy[localeFromPath(pathname)][page];
  if (!entry) throw new Error("Unsupported static metadata page");
  const [title, description] = entry;
  return {
    title,
    description,
    alternates: languageAlternates(pathname),
    openGraph: { title, description, url: pathname, siteName: "PC FIX", type: "website" },
  };
}
