/**
 * ExportButtons Component
 * Provides CSV and Excel export functionality for student data
 */
import { Button, ButtonGroup, Icon } from '@chakra-ui/react';
import * as XLSX from 'xlsx';
import useStudentStore from '../store/studentStore';

// Download icon component
const DownloadIcon = (props) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M5 20h14v-2H5v2zm7-18L5.33 9h3.67v6h4V9h3.67L12 2z"
      transform="rotate(180 12 12)"
    />
  </Icon>
);

const ExportButtons = () => {
  // Get filtered students from store
  const getFilteredStudents = useStudentStore((state) => state.getFilteredStudents);

  /**
   * Format student data for export
   */
  const formatDataForExport = () => {
    const students = getFilteredStudents();
    return students.map((student) => ({
      ID: student.id,
      'Student Name': student.student_name,
      'Date of Birth': student.BOD,
      Department: student.Department,
      Major: student.Major,
      Year: student.Year,
      Class: student.class,
      Province: student.Province,
    }));
  };

  /**
   * Export data as CSV file
   */
  const exportToCSV = () => {
    const data = formatDataForExport();
    
    if (data.length === 0) {
      return;
    }

    // Create CSV content
    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(','),
      ...data.map((row) =>
        headers
          .map((header) => {
            const value = row[header];
            // Escape commas and quotes in values
            const escaped = String(value).replace(/"/g, '""');
            return `"${escaped}"`;
          })
          .join(',')
      ),
    ];

    const csvContent = csvRows.join('\n');
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `students_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /**
   * Export data as Excel file
   */
  const exportToExcel = () => {
    const data = formatDataForExport();
    
    if (data.length === 0) {
      return;
    }

    // Create workbook and worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    
    // Set column widths
    worksheet['!cols'] = [
      { wch: 5 },   // ID
      { wch: 20 },  // Student Name
      { wch: 12 },  // Date of Birth
      { wch: 20 },  // Department
      { wch: 25 },  // Major
      { wch: 6 },   // Year
      { wch: 8 },   // Class
      { wch: 15 },  // Province
    ];

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');

    // Generate and download file
    XLSX.writeFile(workbook, `students_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <ButtonGroup size="sm" isAttached variant="outline">
      <Button
        leftIcon={<DownloadIcon />}
        colorScheme="green"
        onClick={exportToCSV}
      >
        Export CSV
      </Button>
      <Button
        leftIcon={<DownloadIcon />}
        colorScheme="blue"
        onClick={exportToExcel}
      >
        Export Excel
      </Button>
    </ButtonGroup>
  );
};

export default ExportButtons;
