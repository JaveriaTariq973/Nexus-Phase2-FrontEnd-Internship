import React, { useState, useRef } from 'react';
import { FileText, Upload, Download, Trash2, Share2, PenTool } from 'lucide-react';
import SignatureCanvas from 'react-signature-canvas';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

type DocStatus = 'Draft' | 'In Review' | 'Signed';

interface DocItem {
  id: number;
  name: string;
  type: string;
  size: string;
  lastModified: string;
  shared: boolean;
  status: DocStatus;
  url?: string;
}

const initialDocuments: DocItem[] = [
  {
    id: 1,
    name: 'Pitch Deck 2024.pdf',
    type: 'PDF',
    size: '2.4 MB',
    lastModified: '2024-02-15',
    shared: true,
    status: 'Draft',
  },
  {
    id: 2,
    name: 'Financial Projections.xlsx',
    type: 'Spreadsheet',
    size: '1.8 MB',
    lastModified: '2024-02-10',
    shared: false,
    status: 'In Review',
  },
  {
    id: 3,
    name: 'Business Plan.docx',
    type: 'Document',
    size: '3.2 MB',
    lastModified: '2024-02-05',
    shared: true,
    status: 'Signed',
  },
  {
    id: 4,
    name: 'Market Research.pdf',
    type: 'PDF',
    size: '5.1 MB',
    lastModified: '2024-01-28',
    shared: false,
    status: 'Draft',
  },
];

const statusColor = (status: DocStatus) => {
  if (status === 'Signed') return 'success';
  if (status === 'In Review') return 'secondary';
  return 'gray';
};

export const DocumentsPage: React.FC = () => {
  const [documents, setDocuments] = useState<DocItem[]>(initialDocuments);
  const [signingDocId, setSigningDocId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const sigRef = useRef<SignatureCanvas>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newDoc: DocItem = {
      id: Date.now(),
      name: file.name,
      type: file.type.includes('pdf') ? 'PDF' : 'Document',
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      lastModified: new Date().toISOString().split('T')[0],
      shared: false,
      status: 'Draft',
      url: URL.createObjectURL(file),
    };

    setDocuments(prev => [newDoc, ...prev]);
    e.target.value = '';
  };

  const updateStatus = (id: number, status: DocStatus) => {
    setDocuments(prev => prev.map(d => (d.id === id ? { ...d, status } : d)));
  };

  const deleteDoc = (id: number) => {
    setDocuments(prev => prev.filter(d => d.id !== id));
  };

  const openSignPad = (id: number) => {
    setSigningDocId(id);
  };

  const saveSignature = () => {
    if (!sigRef.current || sigRef.current.isEmpty()) {
      alert('Pehle signature pad pe sign karo.');
      return;
    }
    if (signingDocId !== null) {
      updateStatus(signingDocId, 'Signed');
    }
    setSigningDocId(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
          <p className="text-gray-600">Manage your startup's important files</p>
        </div>

        <div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".pdf,.doc,.docx,.xlsx"
            onChange={handleFileChange}
          />
          <Button leftIcon={<Upload size={18} />} onClick={handleUploadClick}>
            Upload Document
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Storage info */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <h2 className="text-lg font-medium text-gray-900">Storage</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Used</span>
                <span className="font-medium text-gray-900">12.5 GB</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-primary-600 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Available</span>
                <span className="font-medium text-gray-900">7.5 GB</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Quick Access</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                  Recent Files
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                  Shared with Me
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                  Starred
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                  Trash
                </button>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Document list */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">All Documents</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">Sort by</Button>
                <Button variant="outline" size="sm">Filter</Button>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-2">
                {documents.map(doc => (
                  <div key={doc.id}>
                    <div className="flex items-center p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                      <div className="p-2 bg-primary-50 rounded-lg mr-4">
                        <FileText size={24} className="text-primary-600" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm font-medium text-gray-900 truncate">
                            {doc.url ? (
                              <a href={doc.url} target="_blank" rel="noreferrer" className="hover:underline">
                                {doc.name}
                              </a>
                            ) : (
                              doc.name
                            )}
                          </h3>
                          {doc.shared && <Badge variant="secondary" size="sm">Shared</Badge>}
                          <Badge variant={statusColor(doc.status) as any} size="sm">{doc.status}</Badge>
                        </div>

                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                          <span>{doc.type}</span>
                          <span>{doc.size}</span>
                          <span>Modified {doc.lastModified}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        {doc.status === 'Draft' && (
                          <Button variant="outline" size="sm" onClick={() => updateStatus(doc.id, 'In Review')}>
                            Send for Review
                          </Button>
                        )}
                        {doc.status !== 'Signed' && (
                          <Button
                            variant="outline"
                            size="sm"
                            leftIcon={<PenTool size={14} />}
                            onClick={() => openSignPad(doc.id)}
                          >
                            Sign
                          </Button>
                        )}

                        <Button variant="ghost" size="sm" className="p-2" aria-label="Download">
                          <Download size={18} />
                        </Button>
                        <Button variant="ghost" size="sm" className="p-2" aria-label="Share">
                          <Share2 size={18} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-2 text-error-600 hover:text-error-700"
                          aria-label="Delete"
                          onClick={() => deleteDoc(doc.id)}
                        >
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    </div>

                    {/* Signature pad — inline, only for the doc being signed */}
                    {signingDocId === doc.id && (
                      <div className="mx-4 mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          Sign "{doc.name}"
                        </p>
                        <SignatureCanvas
                          ref={sigRef}
                          penColor="black"
                          canvasProps={{ className: 'border rounded-md bg-white w-full h-32' }}
                        />
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" onClick={saveSignature}>Save Signature</Button>
                          <Button variant="outline" size="sm" onClick={() => sigRef.current?.clear()}>
                            Clear
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => setSigningDocId(null)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};