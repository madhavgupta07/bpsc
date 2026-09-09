import LegalArticle from '../components/legal/LegalArticle';

export default function Terms() {
  return (
    <LegalArticle
      ns="terms"
      eyebrow="nav.support"
      seo={{
        description: 'The terms governing your use of Bihar STET & BPSC CS — accounts, content usage, and liability limits.',
        path: '/terms',
      }}
    />
  );
}