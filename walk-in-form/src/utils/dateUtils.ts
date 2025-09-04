import dayjs, { Dayjs } from 'dayjs';

/**
 * Safely convert string date to dayjs object
 */
export function safeParseDate(dateStr?: string | null): Dayjs | null {
  if (!dateStr || dateStr.trim() === '') {
    return null;
  }

  try {
    console.log('Parsing date:', dateStr);
    
    // Handle MM/DD/YYYY format from Google Sheets
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      const part1 = parseInt(parts[0]);
      const part2 = parseInt(parts[1]);
      const year = parseInt(parts[2]);
      
      if (!isNaN(part1) && !isNaN(part2) && !isNaN(year)) {
        let month: number, day: number;
        
        if (part1 > 12 && part2 <= 12) {
          // DD/MM/YYYY format
          day = part1;
          month = part2;
        } else if (part2 > 12 && part1 <= 12) {
          // MM/DD/YYYY format (from Google Sheets)
          month = part1;
          day = part2;
        } else {
          // Ambiguous case - assume MM/DD/YYYY (Google Sheets default)
          month = part1;
          day = part2;
        }
        
        // Create dayjs object directly with year, month (0-based), day at noon to avoid timezone issues
        const result = dayjs().year(year).month(month - 1).date(day).hour(12).minute(0).second(0).millisecond(0);
        console.log('Parsed result:', result.format('DD/MM/YYYY'));
        return result;
      }
    }
    
    // Fallback to dayjs default parsing
    const parsed = dayjs(dateStr);
    return parsed.isValid() ? parsed : null;
  } catch (error) {
    console.warn('Error parsing date:', error, 'for date:', dateStr);
    return null;
  }
}

/**
 * Convert dayjs object back to string for API submission
 */
export function formatDateForAPI(date?: Dayjs | string | null): string | undefined {
  if (!date) return undefined;
  
  try {
    if (typeof date === 'string') {
      return date;
    }
    
    if (dayjs.isDayjs(date)) {
      return date.format('YYYY-MM-DD');
    }
    
    return undefined;
  } catch (error) {
    console.warn('Error formatting date for API:', error);
    return undefined;
  }
}

/**
 * Convert form values with dates to API format
 */
export function convertFormDatesForAPI(formValues: any): any {
  const converted = { ...formValues };
  
  // Handle visitDate
  if (converted.visitDate) {
    converted.visitDate = formatDateForAPI(converted.visitDate);
  }
  
  // Handle followUps array (date inside objects)
  if (Array.isArray(converted.followUps)) {
    converted.followUps = converted.followUps.map((fu: any) => ({
      ...fu,
      date: formatDateForAPI(fu?.date) || undefined,
    }));
  }
  
  return converted;
}
