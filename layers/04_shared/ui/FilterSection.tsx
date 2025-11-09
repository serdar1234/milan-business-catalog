import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  children,
  defaultExpanded = true,
}) => (
  <Accordion defaultExpanded={defaultExpanded} disableGutters elevation={0}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon color="action" />}
      sx={{ minHeight: 48, p: 0 }}
    >
      <Typography variant="subtitle1" fontWeight="bold">
        {title}
      </Typography>
    </AccordionSummary>
    <AccordionDetails sx={{ p: 2 }}>{children}</AccordionDetails>
  </Accordion>
);

export default FilterSection;
