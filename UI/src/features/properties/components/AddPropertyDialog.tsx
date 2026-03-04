import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem,
} from "@mui/material";

interface PropertyFormData {
  name: string;
  address: string;
  city: string;
  state: string;
  type: string;
  units: string;
}

interface AddPropertyDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: PropertyFormData) => void;
}

const AddPropertyDialog: React.FC<AddPropertyDialogProps> = ({ open, onClose, onSubmit }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PropertyFormData>({
    defaultValues: {
      name: "",
      address: "",
      city: "",
      state: "",
      type: "Residential",
      units: "",
    },
  });

  const handleFormSubmit = (data: PropertyFormData) => {
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700 }}>Add New Property</DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="name"
                control={control}
                rules={{ required: "Property name is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Property Name"
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="address"
                control={control}
                rules={{ required: "Address is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Address"
                    fullWidth
                    multiline
                    rows={2}
                    error={!!errors.address}
                    helperText={errors.address?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Controller
                name="city"
                control={control}
                rules={{ required: "City is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="City"
                    fullWidth
                    error={!!errors.city}
                    helperText={errors.city?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Controller
                name="state"
                control={control}
                rules={{ required: "State is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="State"
                    fullWidth
                    error={!!errors.state}
                    helperText={errors.state?.message}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <TextField {...field} select label="Property Type" fullWidth>
                    <MenuItem value="Residential">Residential</MenuItem>
                    <MenuItem value="Commercial">Commercial</MenuItem>
                    <MenuItem value="Industrial">Industrial</MenuItem>
                  </TextField>
                )}
              />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Controller
                name="units"
                control={control}
                rules={{
                  required: "Number of units is required",
                  pattern: { value: /^[0-9]+$/, message: "Must be a number" },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Number of Units"
                    fullWidth
                    error={!!errors.units}
                    helperText={errors.units?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Add Property
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddPropertyDialog;
