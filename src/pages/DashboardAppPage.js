import { Helmet } from "react-helmet-async";
import { faker } from "@faker-js/faker";
// @mui
import { useTheme } from "@mui/material/styles";
import { Grid, Container, Typography } from "@mui/material";
// components
import Iconify from "../components/iconify";
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from "../sections/@dashboard/app";

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();

  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome to Zarich Travel dashboard
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Create a blog post" />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="View and delete users" />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Edit and delete blog post" />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
