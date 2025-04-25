// CartProvider.tsx

type CartItem = Product & { quantity: number };

type CartContextType = {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: string) => void;
    increaseQuantity: (id: string) => void;
    decreaseQuantity: (id: string) => void;
    cartItemCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [cartItemCount, setCartItemCount] = useState<number>(0);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            try {
                const parsed = JSON.parse(storedCart);
                if (Array.isArray(parsed)) {
                    const normalized = parsed.map((item: any) => ({
                        ...item,
                        price: Number(item.price),
                        quantity: item.quantity ?? 1,
                    }));
                    setCart(normalized);
                    updateCartCount(normalized);
                }
            } catch (e) {
                console.error('Erro ao carregar carrinho:', e);
            }
        }
    }, []);

    const persistCart = (updatedCart: CartItem[]) => {
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        updateCartCount(updatedCart);
    };

    const updateCartCount = (cart: CartItem[]) => {
        const count = cart.reduce((acc, item) => acc + item.quantity, 0);
        setCartItemCount(count);
    };

    const addToCart = (product: Product) => {
        const exists = cart.find(item => item.id === product.id);
        if (exists) {
            const updated = cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            persistCart(updated);
        } else {
            const newItem: CartItem = { ...product, price: Number(product.price), quantity: 1 };
            persistCart([...cart, newItem]);
        }
    };

    const removeFromCart = (id: string) => {
        const updated = cart.filter(item => item.id !== id);
        persistCart(updated);
    };

    const increaseQuantity = (id: string) => {
        const updated = cart.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        persistCart(updated);
    };

    const decreaseQuantity = (id: string) => {
        const updated = cart.map(item =>
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
        );
        persistCart(updated);
    };

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, cartItemCount }}
        >
            {children}
        </CartContext.Provider>
    );
};
