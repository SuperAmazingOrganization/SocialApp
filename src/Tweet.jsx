import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Tweet({title}) {
    console.log(title)

  return (
    <Card sx={{ minWidth: 275, maxWidth: 600 }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.primary', fontSize: 20 }}>
          {title}
        </Typography>
        <Typography variant="body2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae ornare ligula,
          non ornare justo. Donec auctor, lorem ac malesuada ornare, tellus nibh viverra lectus,
          sit amet finibus risus nulla a ex. Vivamus eu augue metus. Vivamus non urna id nulla
          lacinia ultrices eu dapibus sem. Nam laoreet metus eget urna dapibus, sed pulvinar tellus
           placerat. Donec quis fermentum nisi, sit amet hendrerit arcu. Orci varius natoque penatibus
           et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum mattis, nulla id ultrices
            interdum, enim eros tempus augue, ac consectetur nisl nulla at risus.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
