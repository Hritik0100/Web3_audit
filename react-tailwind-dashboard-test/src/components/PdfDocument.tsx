import { Document, Page, View, Text, StyleSheet, Image } from '@react-pdf/renderer';
import ReactMarkdown from 'react-markdown';

// Create styles with built-in fonts
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    position: 'relative',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.03,
  },
  watermark: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) rotate(-45deg)',
    fontSize: 80,
    color: '#000000',
    opacity: 0.1,
    fontWeight: 'bold',
  },
  content: {
    position: 'relative',
    zIndex: 1,
  },
  section: {
    marginBottom: 20,
  },
  header: {
    borderBottom: '2pt solid #000',
    paddingBottom: 10,
    marginBottom: 20,
  },
  heading1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
    fontFamily: 'Helvetica-Bold',
  },
  heading2: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    fontFamily: 'Helvetica-Bold',
  },
  heading3: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#555',
    fontFamily: 'Helvetica-Bold',
  },
  metadata: {
    fontSize: 10,
    color: '#666',
    marginBottom: 4,
    fontFamily: 'Helvetica',
  },
  codeBlock: {
    backgroundColor: '#f8f9fa',
    padding: 10,
    border: '1pt solid #e9ecef',
    borderRadius: 4,
    fontFamily: 'Courier',
    fontSize: 8,
    marginVertical: 8,
    color: '#333',
  },
  inlineCode: {
    backgroundColor: '#f8f9fa',
    padding: '2px 4px',
    border: '1pt solid #e9ecef',
    borderRadius: 4,
    fontFamily: 'Courier',
    fontSize: 8,
    color: '#333',
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  bulletPoint: {
    width: 20,
    paddingRight: 5,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  paragraph: {
    marginBottom: 8,
    fontSize: 10,
    lineHeight: 1.4,
    color: '#333',
    fontFamily: 'Helvetica',
  },
  strong: {
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginVertical: 8,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 8,
    padding: 5,
    fontFamily: 'Helvetica',
  },
  severityHigh: {
    color: '#dc2626',
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
  },
  severityMedium: {
    color: '#ea580c',
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
  },
  severityLow: {
    color: '#ca8a04',
    fontWeight: 'bold',
    fontFamily: 'Helvetica-Bold',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 8,
    color: '#666',
    borderTop: '1pt solid #e5e5e5',
    paddingTop: 10,
    fontFamily: 'Helvetica',
  },
});

const MarkdownComponents = {
  h1: ({ children }) => <Text style={styles.heading1}>{children}</Text>,
  h2: ({ children }) => <Text style={styles.heading2}>{children}</Text>,
  h3: ({ children }) => <Text style={styles.heading3}>{children}</Text>,
  code: ({ inline, children }) => (
    <Text style={inline ? styles.inlineCode : styles.codeBlock}>
      {children}
    </Text>
  ),
  ul: ({ children }) => <View style={styles.section}>{children}</View>,
  li: ({ children }) => (
    <View style={styles.listItem}>
      <Text style={styles.bulletPoint}>•</Text>
      <Text style={styles.paragraph}>{children}</Text>
    </View>
  ),
  p: ({ children }) => <Text style={styles.paragraph}>{children}</Text>,
  strong: ({ children }) => <Text style={styles.strong}>{children}</Text>,
  table: ({ children }) => <View style={styles.table}>{children}</View>,
  tr: ({ children }) => <View style={styles.tableRow}>{children}</View>,
  td: ({ children }) => (
    <View style={styles.tableCol}>
      <Text style={styles.tableCell}>{children}</Text>
    </View>
  ),
  th: ({ children }) => (
    <View style={styles.tableCol}>
      <Text style={[styles.tableCell, styles.strong]}>{children}</Text>
    </View>
  ),
};

// Background pattern component
const BackgroundPattern = () => (
  <View style={styles.background} fixed>
    <Text style={styles.watermark}>AI AUDIT</Text>
  </View>
);

const PdfDocument = ({ archive }) => {
  // Parse audit results to extract key information
  const parseAuditResults = (results) => {
    if (typeof results === 'string') {
      try {
        return JSON.parse(results);
      } catch {
        return { summary: results };
      }
    }
    return results || {};
  };

  const auditData = parseAuditResults(archive.audit_result);

  // Safe data extraction for vulnerabilities
  const vulnerabilities = auditData.vulnerabilities || 
                         auditData.issues || 
                         (Array.isArray(auditData) ? auditData : []);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <BackgroundPattern />
        
        <View style={styles.content}>
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.heading1}>Smart Contract Audit Report</Text>
            <Text style={styles.metadata}>Contract: {archive.contract_name || 'Unnamed Contract'}</Text>
            <Text style={styles.metadata}>Audit Date: {new Date(archive.created_at).toLocaleDateString()}</Text>
            <Text style={styles.metadata}>Report ID: {archive.id || 'N/A'}</Text>
          </View>

          {/* Executive Summary */}
          <View style={styles.section}>
            <Text style={styles.heading2}>Executive Summary</Text>
            <Text style={styles.paragraph}>
              This report presents the findings from the automated security audit of the smart contract. 
              The audit was conducted using AI-powered analysis to identify potential vulnerabilities 
              and security issues.
            </Text>
          </View>

          {/* Audit Findings */}
          <View style={styles.section}>
            <Text style={styles.heading2}>Audit Findings</Text>
            <ReactMarkdown components={MarkdownComponents}>
              {typeof archive.audit_result === 'string' 
                ? archive.audit_result 
                : JSON.stringify(archive.audit_result, null, 2)}
            </ReactMarkdown>
          </View>

          {/* Vulnerability Summary Table - Only show if we have vulnerabilities */}
          {vulnerabilities.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.heading2}>Vulnerability Summary</Text>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <View style={styles.tableCol}>
                    <Text style={[styles.tableCell, styles.strong]}>Severity</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={[styles.tableCell, styles.strong]}>Type</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={[styles.tableCell, styles.strong]}>Location</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={[styles.tableCell, styles.strong]}>Status</Text>
                  </View>
                </View>
                {vulnerabilities.map((vuln, index) => (
                  <View style={styles.tableRow} key={index}>
                    <View style={styles.tableCol}>
                      <Text style={[
                        styles.tableCell, 
                        (vuln.severity || '').toLowerCase() === 'high' ? styles.severityHigh :
                        (vuln.severity || '').toLowerCase() === 'medium' ? styles.severityMedium :
                        styles.severityLow
                      ]}>
                        {vuln.severity || 'Unknown'}
                      </Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{vuln.type || vuln.category || 'N/A'}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{vuln.location || vuln.file || 'N/A'}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{vuln.status || 'Found'}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Patched Code Section */}
          {archive.patched_code && (
            <View style={styles.section}>
              <Text style={styles.heading2}>Recommended Fixes</Text>
              <Text style={styles.codeBlock}>{archive.patched_code}</Text>
            </View>
          )}

          {/* Conclusion */}
          <View style={styles.section}>
            <Text style={styles.heading2}>Conclusion</Text>
            <Text style={styles.paragraph}>
              This audit report provides a comprehensive analysis of the smart contract's security posture. 
              {vulnerabilities.length > 0 
                ? ' It is recommended to address all identified issues before deployment to production environments.'
                : ' No critical vulnerabilities were identified during this audit.'
              }
            </Text>
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer} fixed>
          AI Audit Report - Generated on {new Date().toLocaleDateString()} | Confidential - For authorized use only
        </Text>
      </Page>
    </Document>
  );
};

export default PdfDocument;