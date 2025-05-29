import { Link } from 'react-router-dom';
import Cover from '../../Shared/Cover/Cover';
import MenuItem from '../../Shared/MenuItem/MenuItem';

const MenuCategory = ({items, title, img}) => {
    return (
        <div className='pt-8'>
            { title && <Cover img={img} title={title}></Cover>}
            <div className="grid md:grid-cols-2 gap-10 my-16">
                {
                    items.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    ></MenuItem>)
                }
            </div>
            <Link to={`/order/${title}`} className="text-blue-600 hover:text-blue-800">
            <button className="btn btn-outline border-0 border-b-4 mt-4 text-blue-600 hover:text-blue-800">Order Now</button>
            </Link>
        </div>
    );
};

export default MenuCategory;