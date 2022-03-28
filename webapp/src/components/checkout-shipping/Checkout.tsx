import { useState, useEffect } from 'react';
import { ItemCart } from "../../shared/shareddtypes";
import { getCart } from '../../api/api';

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Card, Box, Divider} from "@mui/material";
import CheckoutItem from "./CheckoutItem";

type CheckoutProps = {
    items: ItemCart[];
    refreshCartList: () => void;
};

function Checkout(props: CheckoutProps): JSX.Element {

    const [total, setTotal] = useState<number>(0);

    const updateTotal = async () => {
        let cart = await getCart();
        setTotal(cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0));
    };

    const [cart, setCart] = useState<ItemCart[]>([]);

    const refreshCartList = async () => {
        setCart(getCart());
    }

    useEffect(() => {
        refreshCartList();
    }, []);

    useEffect(() => {
        setTotal(props.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0));
    }, [props.items]);



    function loadItems(): JSX.Element {

        if (props.items.length === 0) {
            return (
                <Typography variant="h5" color="text.secondary">
                    The shopping cart is empty
                </Typography>
            );
        }
        else {
            let res = props.items.map((item: ItemCart) => {
                if (item !== null && item.quantity > 0) {
                    return <CheckoutItem updateTotal={updateTotal} item={item} />
                }
            }
            )
            return (
                <div>
                    {res}
                </div>
            );
        }
    }

    return (
        <Box justifyContent="center">
            <Typography component="h1" variant="h3" >
                Checkout
            </Typography>
            <Divider />

            <Box style={{ display: 'flex' }}>
                <Stack m={6} spacing={5} style={{ flex: 3 }}>
                    {loadItems()}
                    <Card variant="elevation" sx={{ display: 'flex', flexDirection: 'column', padding: 3 }}>
                        <Typography component="h1" variant="h6" color="text.secondary">
                            Cart Totals:
                        </Typography>
                        <Typography component="h1" variant="h4">
                            {total.toString().concat(" €")}
                        </Typography>
                    </Card>
                    {props.items.length > 0 ? <Button variant="contained" href="/shipping" style={{ color: "white", backgroundColor: "#7c4dff", borderRadius: "8px", top: "20px", height: "50px" }}>
                        Continue to Shipping
                    </Button> : <></>}
                </Stack>
            </Box>
        </Box>
    );
}

export default Checkout;