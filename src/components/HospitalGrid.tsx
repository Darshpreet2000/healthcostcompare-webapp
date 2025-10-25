import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
  Rating,
  Tooltip,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import StarIcon from "@mui/icons-material/Star";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import GroupIcon from '@mui/icons-material/Group';
import PaidIcon from '@mui/icons-material/Paid';

interface ProcedureCostDetail {
  drg_description: string;
  avg_total_payment: number;
  medicare_payment: number;
  total_discharges: number;
  avg_submitted_covered_charge: number;
}

interface Hospital {
  id: string;
  name: string;
  rating: number;
  location: string;
  distance_miles: number | null;
  imageUrl?: string;
  hospital_type?: string;
  emergency_services?: string;
  procedure_cost_details: ProcedureCostDetail[];
}

interface HospitalGridProps {
  hospitals: Hospital[];
  onViewDetails?: (hospitalId: string) => void;
}

const HospitalGrid: React.FC<HospitalGridProps> = ({
  hospitals,
  onViewDetails,
}) => {
  const formatCurrency = (amount: number | null | undefined) => {
    if (amount === null || amount === undefined || isNaN(amount)) {
      return "N/A";
    }
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 4, fontWeight: 'bold', color: '#1a202c' }}>
        Hospital Details with the procedure
      </Typography>
      {/* Cast Grid to any to bypass persistent TypeScript error */}
      <Grid container spacing={4} component="div" {...({} as any)}>
        {hospitals.map((hospital, index) => {
          const firstProcedure = hospital.procedure_cost_details[0];
          return (
            <Grid item xs={12} sm={6} md={4} key={`${hospital.id}-${index}`} component="div" sx={{ height: "100%" }} {...({} as any)}> {/* Cast Grid item to any */}
              <Card
                elevation={6}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: 3,
                  borderRadius: 2,
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 8,
                  },
                }}
              >
                {hospital.imageUrl && (
                  <Box sx={{ position: 'relative', width: '100%', height: 200, overflow: 'hidden' }}>
                    <Image
                      src={hospital.imageUrl}
                      alt={hospital.name}
                      layout="fill"
                      objectFit="cover"
                      style={{ borderRadius: '8px 8px 0 0' }}
                    />
                  </Box>
                )}
                <CardContent sx={{ 
                  flexGrow: 1, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between',
                  minHeight: 350,
                  p: 2,
                }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: '#2c3e50', mb: 0.5 }} aria-label={`Hospital name: ${hospital.name}`}>
                      {hospital.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }} aria-label={`Rating: ${hospital.rating} out of 5 stars`}>
                      <Rating name="read-only" value={hospital.rating} readOnly precision={0.5} emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} />
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        ({hospital.rating})
                      </Typography>
                    </Box>
                    
                    {firstProcedure && (
                      <Tooltip title="Average total payment for the procedure." arrow>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }} aria-label={`Procedure price: ${formatCurrency(firstProcedure.avg_total_payment)}`}>
                          <AttachMoneyIcon sx={{ mr: 1, color: '#28a745', fontSize: 'large' }} />
                          <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
                            {formatCurrency(firstProcedure.avg_total_payment)}
                          </Typography>
                        </Box>
                      </Tooltip>
                    )}

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }} aria-label={`Location: ${hospital.location}`}>
                      <LocationOnIcon sx={{ mr: 1, color: '#dc3545', fontSize: 'small' }} />
                      <Typography variant="body2" color="text.secondary">
                        {hospital.location}
                      </Typography>
                    </Box>
                    {hospital.distance_miles !== null && (
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }} aria-label={`${hospital.distance_miles.toFixed(1)} miles away`}>
                        {hospital.distance_miles.toFixed(1)} miles away
                      </Typography>
                    )}

                    {/* Hospital Type and Emergency Services */}
                    {(hospital.hospital_type || hospital.emergency_services) && (
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                        {hospital.hospital_type && (
                          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }} aria-label={`Hospital type: ${hospital.hospital_type}`}>
                            <LocalHospitalIcon sx={{ mr: 1, color: '#007bff', fontSize: 'small' }} />
                            <Typography variant="body2" color="text.secondary">
                              Type: {hospital.hospital_type}
                            </Typography>
                          </Box>
                        )}
                        {hospital.emergency_services && (
                          <Box sx={{ display: 'flex', alignItems: 'center' }} aria-label={`Emergency Services: ${hospital.emergency_services}`}>
                            <Typography variant="body2" color="text.secondary">
                              Emergency: {hospital.emergency_services}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    )}

                    {/* Procedure Description */}
                    {firstProcedure && firstProcedure.drg_description && (
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }} aria-label={`Procedure: ${firstProcedure.drg_description}`}>
                        Procedure: {firstProcedure.drg_description}
                      </Typography>
                    )}

                    {/* Discharges and Covered Charge */}
                    {firstProcedure && firstProcedure.total_discharges !== undefined && (
                      <Tooltip title="Total number of patient discharges for this procedure at this hospital." arrow>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }} aria-label={`Total discharges: ${firstProcedure.total_discharges}`}>
                          <GroupIcon sx={{ mr: 1, color: '#6c757d', fontSize: 'small' }} />
                          <Typography variant="body2" color="text.secondary">
                            Total Discharges: {firstProcedure.total_discharges}
                          </Typography>
                        </Box>
                      </Tooltip>
                    )}
                    {firstProcedure && firstProcedure.avg_submitted_covered_charge !== undefined && (
                      <Tooltip title="Average insurance coverage amount for this procedure." arrow>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }} aria-label={`Average covered charge: ${formatCurrency(firstProcedure.avg_submitted_covered_charge)}`}>
                          <PaidIcon sx={{ mr: 1, color: '#17a2b8', fontSize: 'small' }} />
                          <Typography variant="body2" color="text.secondary">
                            Avg. Covered Charge: {formatCurrency(firstProcedure.avg_submitted_covered_charge)}
                          </Typography>
                        </Box>
                      </Tooltip>
                    )}
                  </Box>
                  {onViewDetails && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => onViewDetails(hospital.id)}
                      sx={{ mt: 2, alignSelf: 'flex-start' }}
                    >
                      View Details
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default HospitalGrid;
