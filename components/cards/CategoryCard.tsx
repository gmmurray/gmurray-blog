import {
    Avatar,
    Card,
    CardContent,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { ChangeEvent, FC, useCallback, useState } from 'react';

import { CardComponentProps } from '../../lib/types';
import ClearIcon from '@mui/icons-material/Clear';
import { ICategory } from '../../lib/sanityTypes';
import SearchIcon from '@mui/icons-material/Search';
import { urlForImage } from '../../lib/sanity';

type CategoryCardProps = {
    category: ICategory;
    onSearchSubmit: (value: string) => any;
    onReset: () => any;
} & CardComponentProps;

const CategoryCard: FC<CategoryCardProps> = ({
    category,
    onSearchSubmit,
    onReset,
    ...cardProps
}) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [searchInput, setSearchInput] = useState('');

    const handleSearchChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) =>
            setSearchInput(event.currentTarget.value),
        [],
    );

    const handleSubmit = useCallback(
        () => onSearchSubmit(searchInput),
        [onSearchSubmit, searchInput],
    );

    const handleReset = useCallback(() => {
        onReset();
        setSearchInput('');
    }, [onReset]);

    return (
        <Card
            elevation={cardProps.elevation}
            sx={{ minHeight: cardProps.cardHeight }}
        >
            <CardContent
                sx={{
                    minHeight: cardProps.contentHeight,
                    maxHeight: cardProps.contentHeight,
                }}
                component={Grid}
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                <Grid item xs={12}>
                    <Avatar
                        // @ts-ignore
                        src={urlForImage(category.image)}
                        sx={{ width: 56, height: 56 }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h3">{category.title}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1">
                        {category.description}
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sx={{ width: isSmallScreen ? '100%' : '50%', mt: 'auto' }}
                >
                    <TextField
                        variant="standard"
                        placeholder="Search posts..."
                        type="text"
                        onChange={handleSearchChange}
                        value={searchInput}
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton
                                        edge="start"
                                        onClick={handleSubmit}
                                    >
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        edge="end"
                                        onClick={handleReset}
                                    >
                                        <ClearIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
            </CardContent>
        </Card>
    );
};

export default CategoryCard;
