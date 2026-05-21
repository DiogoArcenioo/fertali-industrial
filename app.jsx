/* global React, ReactDOM, Nav, Hero, Strip, Sobre, Produtos, Servicos, Projetos, CTA, Footer, WhatsAppFloat */
/* global useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakSelect, TweakToggle, TweakText */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "tema": "grafite",
  "heroVariant": "type",
  "headline": "Precis\u00e3o em a\u00e7o.\\nPara projetos que exigem performance.",
  "subhead": "Solu\u00e7\u00f5es em metal para ind\u00fastrias, constru\u00e7\u00e3o civil, agroneg\u00f3cio, m\u00e1quinas e equipamentos."
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', t.tema);
  }, [t.tema]);

  // \n vem como literal "\n" do JSON persistido; converte para quebra real
  const headline = (t.headline || '').replace(/\\n/g, '\n');

  return (
    <>
      <Nav />
      <Hero variant={t.heroVariant} headline={headline} subhead={t.subhead} />
      <Strip />
      <Sobre />
      <Produtos />
      <Servicos />
      <Projetos />
      <CTA />
      <Footer />
      <WhatsAppFloat />

      <TweaksPanel title="Tweaks · Fertali">
        <TweakSection label="Tema" />
        <TweakRadio
          label="Paleta de fundo"
          value={t.tema}
          options={[
            { value: 'grafite', label: 'Grafite' },
            { value: 'azul', label: 'Azul' },
            { value: 'light', label: 'Claro' },
          ]}
          onChange={(v) => setTweak('tema', v)}
        />

        <TweakSection label="Hero" />
        <TweakSelect
          label="Layout"
          value={t.heroVariant}
          options={[
            { value: 'type', label: 'Tipografia gigante (recomendado)' },
            { value: 'split', label: 'Split com foto' },
            { value: 'full', label: 'Foto full-bleed' },
          ]}
          onChange={(v) => setTweak('heroVariant', v)}
        />

        <TweakSection label="Copy" />
        <TweakText
          label="Headline (\\n quebra linha)"
          value={t.headline}
          onChange={(v) => setTweak('headline', v)}
        />
        <TweakText
          label="Subtítulo"
          value={t.subhead}
          onChange={(v) => setTweak('subhead', v)}
        />
      </TweaksPanel>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
