import showdown from "showdown";
const markdown = new showdown.Converter();

export const Markdown = ({ content = "" }) => (
  <div
    className="prose"
    dangerouslySetInnerHTML={{
      __html: markdown.makeHtml(content),
    }}
  />
);
