import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getProducts } from '../../api/api';
import { Product } from '../../shared/shareddtypes';
import ProductCard from './ProductCard';
import '../../css/MainProducts.scss'
import Grid from "@mui/material/Grid";

import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Brightness1Icon from '@mui/icons-material/Brightness1';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { IconButton, MenuItem, Select, Slider, Typography } from '@mui/material';

import { yellow, orange, red, green, blue } from '@mui/material/colors';
import Star from '@mui/icons-material/Star';
import React from 'react';

import "../../css/MainProducts.css";

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

type MainProductsProps = {
  refreshCartList: () => void;
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function filterColor(color: string) {
  console.log(color);
  (document.getElementById("colorChooser") as HTMLDivElement).textContent = color;
}

function filterBrand(brand: string) {
  console.log(brand);
  (document.getElementById("brandChooser") as HTMLDivElement).textContent = brand;
}

function filterMinPrice(price: number) {
  console.log(price);
}

function filterMaxPrice(price: number) {
  console.log(price);
}

function filterRating(rating: number) {
  console.log(rating);
}

function MainProducts(props: MainProductsProps): JSX.Element {

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);

  const refreshProductList = async () => {
    setProducts(await getProducts(searchParams.get('q') as string));
  }

  useEffect(() => {
    refreshProductList();
  }, []);

  return (
    <>
      <IconButton
        id="openFilterButton"
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={{ mr: 2, ...(open && { display: 'none' }) }}
      >
        <MenuIcon /><Typography>FILTER</Typography>
      </IconButton>

      <Grid container
        spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
        rowSpacing={5}
      >

        {products.map((p, i) => (
          <Grid item xs={2} sm={4} md={4} key={p.id} >
            <ProductCard key={p.id} product={p} refreshCartList={props.refreshCartList} />
          </Grid>
        ))}
      </Grid>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}

      >
        <div id="filterDrawer">
          <DrawerHeader>
            <Typography variant='h4' id="filterTitle">Filter</Typography>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider /><br />

          <Typography variant='h5' style={{ float: "left" }}>Color</Typography>

          <br />
          <Select
            id="colorChooser"
            sx={{ width: 200 }}
          >
            <MenuItem>
              <ListItem button key="yellow" onClick={() => { filterColor("yellow") }}>
                <ListItemIcon>
                  <Brightness1Icon sx={{ color: yellow[500] }}></Brightness1Icon>
                </ListItemIcon>
                <ListItemText primary="yellow" />
              </ListItem>
            </MenuItem>
            <br></br>
            <MenuItem>
              <ListItem button key="orange" onClick={() => { filterColor("orange") }}>
                <ListItemIcon>
                  <Brightness1Icon sx={{ color: orange[500] }}></Brightness1Icon>
                </ListItemIcon>
                <ListItemText primary="orange" />
              </ListItem>
            </MenuItem>
            <br></br>
            <MenuItem>
              <ListItem button key="red" onClick={() => { filterColor("red") }}>
                <ListItemIcon>
                  <Brightness1Icon sx={{ color: red[500] }}></Brightness1Icon>
                </ListItemIcon>
                <ListItemText primary="red" />
              </ListItem>
            </MenuItem>
            <br></br>
            <MenuItem>
              <ListItem button key="gray" onClick={() => { filterColor("gray") }}>
                <ListItemIcon>
                  <Brightness1Icon></Brightness1Icon>
                </ListItemIcon>
                <ListItemText primary="gray" />
              </ListItem>
            </MenuItem>
            <br></br>
            <MenuItem>
              <ListItem button key="green" onClick={() => { filterColor("green") }}>
                <ListItemIcon>
                  <Brightness1Icon sx={{ color: green[500] }}></Brightness1Icon>
                </ListItemIcon>
                <ListItemText primary="green" />
              </ListItem>
            </MenuItem>
            <br></br>
            <MenuItem>
              <ListItem button key="blue" onClick={() => { filterColor("blue") }}>
                <ListItemIcon>
                  <Brightness1Icon sx={{ color: blue[500] }}></Brightness1Icon>
                </ListItemIcon>
                <ListItemText primary="blue" />
              </ListItem>
            </MenuItem>
            <br></br>
            <MenuItem>
              <ListItem id="black" button key="white" onClick={() => { filterColor("white") }}>
                <ListItemIcon>
                  <Brightness1Icon id="whiteIcon"></Brightness1Icon>
                </ListItemIcon>
                <ListItemText primary="white" />
              </ListItem>
            </MenuItem>
            <br></br>
            <MenuItem>
              <ListItem id="black" button key="black" onClick={() => { filterColor("black") }}>
                <ListItemIcon>
                  <Brightness1Icon id="blackIcon"></Brightness1Icon>
                </ListItemIcon>
                <ListItemText primary="black" />
              </ListItem>
            </MenuItem>
          </Select>

          <br /><br /><Divider /><br />

          <Typography variant='h5' style={{ float: "left" }}>Brand</Typography>

          <br />

          <Select
            id="brandChooser"
            sx={{ width: 200 }}
          >
            <div id="brandChooserDiv">
              {['Toyota', 'Volvo', 'Renault', 'Nissan', 'Plymouth', 'BMW', 'Subaru', 'Honda', 'Lamborghini', 'Volkswagen', 'Chevy', 'Polestar', 'Porsche'].map((text, index) => (

                <MenuItem>
                  <ListItem button key={text} onClick={() => { filterBrand(text) }} id={"li" + index}>
                    <ListItemIcon>
                      <DirectionsCarIcon />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                </MenuItem>
              ))}
            </div>


          </Select>

          <br /><br /><Divider /><br />

          <Typography variant='h5' style={{ float: "left" }}>Min Price</Typography>

          <Slider
            size="small"
            defaultValue={29.99}
            aria-label="Small"
            valueLabelDisplay="auto"
            id="minPrice"
            min={29.99}
            max={420.0}
            onChange={(_e, value) => { filterMinPrice(value as number) }}
          />

          <br /><Divider /><br />

          <Typography variant='h5' style={{ float: "left" }}>Max Price</Typography>

          <Slider
            size="small"
            defaultValue={420.0}
            aria-label="Small"
            valueLabelDisplay="auto"
            id="maxPrice"
            min={29.99}
            max={420.0}
            onChange={(_e, value) => { filterMaxPrice(value as number) }}
          />

          <br /><Divider /><br />

          <Typography variant='h5' style={{ float: "left" }}>Rating</Typography>

          <Grid container spacing={2} id="ratingFilter">

            {[1, 2, 3, 4, 5].map((text, _index) => (
              <Grid item xs={2}>
                <IconButton title={text as unknown as string} component="span" onClick={() => { filterRating(text) }}>
                  <Star id={"star" + text as unknown as string} />
                </IconButton>
              </Grid>
            ))}
          </Grid>
          <br></br>
        </div>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </>

  );
};
export default MainProducts;