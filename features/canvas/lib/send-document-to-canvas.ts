import { createShapeId, toRichText } from "tldraw";
import { useCanvasStore } from "../store/canvas-store";

type sendDocumentParams = {
  documentId: string;
  title: string;
};

export const sendDocumentToCanvas = ({
  title,
  documentId,
}: sendDocumentParams) => {
  const editor = useCanvasStore.getState().editor;

  console.log(editor);

  if (!editor) return;

  const x = Math.random() * 500;
  const y = Math.random() * 500;

  const cardId = createShapeId();
  const badgeId = createShapeId();
  const titleId = createShapeId();
  const footerId = createShapeId();

  editor.createShape({
    id: cardId,
    type: "geo",

    x,
    y,

    props: {
      geo: "rectangle",
      w: 840,
      h: 240,
      fill: "solid",
      color: "black",
      dash: "draw",
    },

    meta: {
      documentId,
      title,
    },
  });

  editor.createShape({
    id: badgeId,
    type: "text",

    x: x + 20,
    y: y + 16,

    props: {
      richText: toRichText("AI NOTE"),
      size: "s",
      color: "grey",
    },
  });

  editor.createShape({
    id: titleId,
    type: "text",

    x: x + 20,
    y: y + 48,

    props: {
      richText: toRichText(title),
      size: "l",
      color: "black",
      w: 800,
      autoSize: false,
    },

    meta: {
      documentId,
    },
  });

  editor.createShape({
    id: footerId,
    type: "text",

    x: x + 20,
    y: y + 200,

    props: {
      richText: toRichText("Click to open document"),
      size: "s",
      color: "grey",
    },
  });

  editor.groupShapes([cardId, badgeId, titleId, footerId]);
};
