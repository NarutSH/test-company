import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
  Box,
  Modal,
  Chip,
  Rating,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import ImageSlider from "../components/ImageSlider";
import { useToasts } from "react-toast-notifications";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";

const Shop = () => {
  const { addToast } = useToasts();
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [dialogAddOpen, setDialogAddOpen] = useState(false);
  const [dialogConfirmOpen, setDialogConfirmOpen] = useState(false);
  const [productSelected, setProductSelected] = useState(null);
  const cart = JSON.parse(localStorage.getItem("cart")) ?? [];
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState(0);
  const [stock, setStock] = useState(0);
  const [thumbnail, setThumbnail] = useState("");
  const [images, setImages] = useState("");

  const profileString = localStorage.getItem("profile");
  const profile = JSON.parse(profileString);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70vw",
    maxWidth: "900px",
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const init = () => {
    setTitle("");
    setDescription("");
    setCategory("");
    setBrand("");
    setPrice(0);
    setRating(0);
    setStock(0);
    setThumbnail("");
    setImages("");
  };

  const onAddCart = (item) => {
    const newCart = [...cart];

    const isExisting = newCart.find((el) => el.id === item.id);

    if (!isExisting) {
      const itemAdd = {
        ...item,
        qty: 1,
      };

      newCart.push(itemAdd);
    } else {
      newCart.map((el) => {
        return el.id === item.id ? { ...el, qty: el.qty++ } : el;
      });
    }

    localStorage.setItem("cart", JSON.stringify(newCart));

    addToast(<p>Already added to cart</p>, {
      appearance: "success",
      autoDismiss: true,
    });
  };

  const onHandleClickProduct = (item) => {
    setProductSelected(item);
    setModalOpen(true);
  };

  const onHandleClose = () => {
    setProductSelected(null);
    setModalOpen(false);
  };

  const onHandleDialogClose = () => {
    setDialogAddOpen(false);
    init();
  };

  const onHandleDialogConfirmClose = () => {
    setDialogConfirmOpen(false);
  };

  const getData = async () => {
    const response = await axios.get("http://localhost:8000/products");

    setProducts(response.data.data);
  };

  const onHandleSubmit = async () => {
    const data = {
      title,
      description,
      category,
      price,
      brand,
      rating,
      stock,
      thumbnail,
      images: images.split(","),
    };

    const response = await axios.post("http://localhost:8000/products", data);

    addToast(<p>Already Added product</p>, {
      appearance: "success",
      autoDismiss: true,
    });

    onHandleDialogClose();
    getData();
  };

  const onHandleDelete = async () => {
    if (productSelected) {
      const response = await axios.delete(
        `http://localhost:8000/products/${productSelected?._id}`
      );

      addToast(<p>Already deleted product</p>, {
        appearance: "success",
        autoDismiss: true,
      });

      onHandleDialogConfirmClose();
      getData();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const displayModal = (
    <Modal open={modalOpen} onClose={onHandleClose}>
      <Box sx={style}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <ImageSlider images={productSelected?.images} />
          </Grid>
          <Grid item xs={6}>
            <h1>{productSelected?.title}</h1>
            <Chip
              label={productSelected?.category}
              variant="outlined"
              color="primary"
            />
            <Typography variant="body1" gutterBottom>
              {productSelected?.description}
            </Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginY={2}
            >
              <Rating
                name="rating"
                defaultValue={productSelected?.rating}
                precision={0.5}
                readOnly
              />

              <Typography variant="h6" color="primary">
                $ {productSelected?.price}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );

  const displayDialogAdd = (
    <Dialog open={dialogAddOpen} onClose={onHandleDialogClose}>
      <DialogTitle>Add Product</DialogTitle>
      <DialogContent>
        <Box sx={{ minWidth: "400px" }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Title"
                fullWidth
                variant="outlined"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Brand"
                fullWidth
                variant="outlined"
                value={brand}
                onChange={(event) => setBrand(event.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Description"
                fullWidth
                variant="outlined"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Category"
                fullWidth
                variant="outlined"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Price"
                fullWidth
                variant="outlined"
                type="number"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Rating"
                fullWidth
                variant="outlined"
                type="number"
                value={rating}
                onChange={(event) => setRating(event.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Stock"
                fullWidth
                type="number"
                variant="outlined"
                value={stock}
                onChange={(event) => setStock(event.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Thumbnail"
                fullWidth
                variant="outlined"
                value={thumbnail}
                onChange={(event) => setThumbnail(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Images"
                fullWidth
                variant="outlined"
                multiline
                minRows={3}
                value={images}
                onChange={(event) => setImages(event.target.value)}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onHandleDialogClose}>Cancel</Button>
        <Button onClick={onHandleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );

  const displayConfirmDialog = (
    <Dialog open={dialogConfirmOpen} onClose={onHandleDialogConfirmClose}>
      <DialogTitle id="alert-dialog-title">
        Are you sure you want to delete ?
      </DialogTitle>
      <DialogActions>
        <Button onClick={onHandleDialogConfirmClose}>Disagree</Button>
        <Button onClick={onHandleDelete} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box padding={1}>
      {profile && (
        <Box display="flex" justifyContent="end" marginY={3}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setDialogAddOpen(true)}
          >
            Add Product
          </Button>
        </Box>
      )}
      <Grid container spacing={2} margin="auto">
        {products.map((item) => {
          return (
            <Grid item>
              <Card sx={{ maxWidth: 200, position: "relative" }}>
                <IconButton
                  color="error"
                  sx={{
                    position: "absolute",
                    top: "0px",
                    right: "0px",
                  }}
                  onClick={() => {
                    setDialogConfirmOpen(true);
                    setProductSelected(item);
                  }}
                >
                  <ClearIcon />
                </IconButton>
                <CardMedia
                  component="img"
                  height="140"
                  image={item.thumbnail}
                  alt={item.title}
                  onClick={() => onHandleClickProduct(item)}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    className="title"
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className="description"
                  >
                    {item.description}
                  </Typography>

                  <Typography
                    variant="body1"
                    color="primary"
                    className="description"
                  >
                    $ {item.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => onAddCart(item)}
                  >
                    Add To Cart
                  </Button>
                  <Button size="small" variant="contained">
                    BUY
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      {displayModal}
      {displayDialogAdd}
      {displayConfirmDialog}
    </Box>
  );
};

export default Shop;
