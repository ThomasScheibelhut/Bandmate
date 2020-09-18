import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import { darken, fade, lighten } from '@material-ui/core/styles/colorManipulator';
import { ViewState } from '@devexpress/dx-react-scheduler';
import classNames from 'clsx';
import {
    Scheduler,
    MonthView,
    Appointments,
    Toolbar,
    DateNavigator,
    AppointmentTooltip,
    AppointmentForm,
} from '@devexpress/dx-react-scheduler-material-ui';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useDataAPI } from '../components/useDataAPI';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    useParams
} from 'react-router-dom'

const getBorder = theme => (`1px solid ${
    theme.palette.type === 'light'
        ? lighten(fade(theme.palette.divider, 1), 0.88)
        : darken(fade(theme.palette.divider, 1), 0.68)
    }`);

const DayScaleCell = props => (
    <MonthView.DayScaleCell {...props} style={{ textAlign: 'center', fontWeight: 'bold' }} />
);

const styles = theme => ({
    cell: {
        color: '#78909C!important',
        position: 'relative',
        userSelect: 'none',
        verticalAlign: 'top',
        padding: 0,
        height: 100,
        borderLeft: getBorder(theme),
        '&:first-child': {
            borderLeft: 'none',
        },
        '&:last-child': {
            paddingRight: 0,
        },
        'tr:last-child &': {
            borderBottom: 'none',
        },
        '&:hover': {
            backgroundColor: 'white',
        },
        '&:focus': {
            backgroundColor: fade(theme.palette.primary.main, 0.15),
            outline: 0,
        },
    },
    content: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        position: 'absolute',
        alignItems: 'center',
    },
    text: {
        padding: '0.5em',
        textAlign: 'center',
    },
    cloudBack: {
        backgroundColor: '#ECEFF1',
    },
    opacity: {
        opacity: '0.4',
    },
    appointment: {
        borderRadius: '10px',
        '&:hover': {
            opacity: 0.6,
        },
    },
    apptContent: {
        '&>div>div': {
            whiteSpace: 'normal !important',
            lineHeight: 1.2,
        },
    },
    flexibleSpace: {
        flex: 'none',
    },
    flexContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    tooltipContent: {
        padding: theme.spacing(3, 1),
        paddingTop: 0,
        backgroundColor: theme.palette.background.paper,
        boxSizing: 'border-box',
        width: '400px',
    },
    tooltipText: {
        ...theme.typography.body2,
        display: 'inline-block',
    },
    name: {
        ...theme.typography.h6,
        color: theme.palette.text.secondary,
        fontWeight: theme.typography.fontWeightBold,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    circle: {
        width: theme.spacing(4.5),
        height: theme.spacing(4.5),
        verticalAlign: 'super',
    },
    textCenter: {
        textAlign: 'center',
    },
    dateAndTitle: {
        lineHeight: 1.1,
    },
    titleContainer: {
        paddingBottom: theme.spacing(2),
    },
    container: {
        paddingBottom: theme.spacing(1.5),
    },
});


// #FOLD_BLOCK
const CellBase = React.memo(({
    classes,
    startDate,
    formatDate,
    otherMonth,
    // #FOLD_BLOCK
}) => {
    const isFirstMonthDay = startDate.getDate() === 1;
    const formatOptions = isFirstMonthDay
        ? { day: 'numeric', month: 'long' }
        : { day: 'numeric' };
    return (
        <TableCell
            tabIndex={0}
            className={classNames({
                [classes.cell]: true,
                [classes.cloudBack]: true,
                [classes.opacity]: otherMonth,
            })}
        >
            <div className={classes.text}>
                {formatDate(startDate, formatOptions)}
            </div>
        </TableCell>
    );
});

const TimeTableCell = withStyles(styles, { name: 'Cell' })(CellBase);

const Appointment = withStyles(styles, { name: 'Appointment' })(({ classes, ...restProps }) => (
    <Appointments.Appointment
        {...restProps}
        className={classes.appointment}
    />
));

const AppointmentContent = withStyles(styles, { name: 'AppointmentContent' })(({ classes, ...restProps }) => (
    <Appointments.AppointmentContent {...restProps} className={classes.apptContent} />
));

const FlexibleSpace = withStyles(styles, { name: 'ToolbarRoot' })(({ classes, ...restProps }) => (
    <Toolbar.FlexibleSpace {...restProps} className={classes.flexibleSpace}>
        <div className={classes.flexContainer}>
            <Typography variant="h5" style={{ marginLeft: '10px' }}>Event Calender</Typography>
        </div>
    </Toolbar.FlexibleSpace>
));

export const VenueCalender = () => {

    const [{ data, isLoading, isError }, doFetch] = useDataAPI(
        'https://localhost:44330/api/venues/' + useParams().id,
        []
    );

        return (
            <Paper>
                {data.name && <Scheduler
                    data={data.shows}
                >
                    <ViewState
                        defaultCurrentDate={Date()}
                    />

                    <MonthView
                        timeTableCellComponent={TimeTableCell}
                        dayScaleCellComponent={DayScaleCell}
                    />

                    <Appointments
                        appointmentComponent={Appointment}
                        appointmentContentComponent={AppointmentContent}
                    />

                    <Toolbar
                        flexibleSpaceComponent={FlexibleSpace}
                    />
                    <DateNavigator />

                    <AppointmentTooltip
                        showCloseButton
                    />
                    <AppointmentForm />
                </Scheduler>}
            </Paper>
        )
}
