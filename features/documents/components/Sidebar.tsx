import CreateDocument from "./create-document";
import { DocumentList } from "./document-list";
import { ImportPdf } from "./import-pdf";

const Sidebar = () => {
  return (
    <aside className="w-72 border-r border-zinc-800 p-4">
      <CreateDocument />
      <div className="mt-2">
        <ImportPdf />
      </div>
      <div className="mt-4">
        <DocumentList />
      </div>
    </aside>
  );
};

export default Sidebar;
